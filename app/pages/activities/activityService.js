(function (){

	'use strict';

	angular.module('Spigit')
	.service('activityService', [ '$http', function($http){
		return {
			getData: function(){
				return $http
			        .get('./data/data.json')
			        .then(function (response) {
			          return response.data;
		        });
			}
		};
	}]);
}());