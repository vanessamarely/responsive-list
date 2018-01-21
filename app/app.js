(function () {

'use strict';

  angular.module('Spigit',  [
    'ngRoute', 
    'ngAnimate'
  ])
  .config([
    '$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
      
      //$locationProvider.hashPrefix('!');
      
      //routes
      $routeProvider
        .when("/", {
          templateUrl: "pages/activities/activityView.html",
          controller: "activityController"
        })

        .otherwise({
           redirectTo: '/'
        });
    }
  ]);

}());

