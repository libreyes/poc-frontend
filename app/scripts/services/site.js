'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Site
 * @description
 * # patientSearch
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Site', ['$http', 'ENV', function($http, ENV) {

    return {
      getSites: function(){
        return $http({
          method: 'GET',
          url: ENV.host + ENV.apiEndpoints.sites
        });
      },
      getLasersForSite: function(id){
        var apiCall = ENV.host + ENV.apiEndpoints.siteLasers.replace(':id', id);
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      getLaserOperators: function(){
        return $http({
          method: 'GET',
          url: ENV.host + ENV.apiEndpoints.laserOperators
        });
      },

    };

  }]);
