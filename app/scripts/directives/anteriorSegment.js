'use strict';

angular.module('openeyesApp')
  .controller('AnteriorSegmentCtrl', ['$scope', '$attrs', 'Encounter', 'MODEL_DOMAIN',function($scope, $attrs, Encounter, MODEL_DOMAIN){

    var self = this;

    this.init = function(attr){

      this.eyeSide = attr.side;
      $scope.mode = attr.mode;
      $scope.options = 'anterior';
      $scope.model = {};

      //  Listen for save event
      //  Broadcast by encounter page controller
      $scope.$on('encounter.save', this.broadcastModel);
    };

    this.broadcastModel = function(){
      Encounter.addElement(self.getModel());
    };

    this.getModel = function(){
      return {
        name: MODEL_DOMAIN + 'AnteriorSegment',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };
  }])
  .directive('oeAnteriorSegment', [function() {
    return {
      scope: {
        model: '=?ngModel'
      },
      replace: true,
      restrict: 'E',
      controller: 'AnteriorSegmentCtrl',
      templateUrl: 'views/directives/anteriorSegment.html',
      link: function($scope, element, attr, AnteriorSegmentCtrl) {
        AnteriorSegmentCtrl.init(attr);
      }
    };
  }]);
