'use strict';

angular.module('openeyesApp')
  .controller('InjectionSiteCtrl', ['$scope', '$attrs', '$timeout', 'InjectionSite', 'EyeDraw', 'Encounter', 'MODEL_DOMAIN', function($scope, $attrs, $timeout, InjectionSite, EyeDraw, Encounter, MODEL_DOMAIN){

    var self = this;

    this.init = function(){
      $scope.$on('encounter.save', this.broadcastModel);
      $scope.model = {};
      $scope.side = $attrs.side;
      $scope.mode = $attrs.mode;
      $scope.options = 'injectionSite';
      $scope.eyedrawInstance = null;

      this.getData();
    };

    this.broadcastModel = function(){
      Encounter.addElement(self.getModel());
    };

    this.getModel = function(){

      if($scope.lensStatus){
        $scope.model.lensStatus = $scope.lensStatus.label;
      }

      return {
        name: MODEL_DOMAIN + 'InjectionSite',
        subPath: $attrs.side,
        model: $scope.model
      };
    };

    this.getData = function() {
      InjectionSite.getLensStatuses()
        .then(function(data){
          $scope.statuses = data;
        }, function() {
          console.log('Unable to get injection site lens statuses');
        });
    };

    $scope.updateLensStatus = function() {

      if (!$scope.eyedrawInstance) {
        console.warn('EyeDraw instance is not ready yet');
        return;
      }

      $timeout(function() {

        $scope.eyedrawInstance.drawing.doodleArray.filter(function(doodle) {
          return doodle instanceof EyeDraw.InjectionSite;
        }).forEach(function(doodle) {

          var distance = $scope.lensStatus.defaultDistance.toString();
          var validityArray = doodle.validateParameter('distance', distance);

          if (validityArray.valid) {
            doodle.setParameterWithAnimation('distance', validityArray.value);
          }
        });
      });
    };

  }])
  .directive('oeInjectionSite', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/injectionSite.html',
      controller: 'InjectionSiteCtrl',
      link: function (scope, element, attrs, InjectionSiteCtrl) {
        InjectionSiteCtrl.init();
      }
    };
  }]);
