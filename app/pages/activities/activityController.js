(function () {

	'use strict';

	angular.module('Spigit')
	 .controller('activityController', [ '$scope', 'activityService', function ($scope, activityService) {
	 	
	 	$scope.typeText = {
	 		'Comment': 'commented on the idea',
	 		'Idea': 'posted an idea',
	 		'Reply': 'replied to a comment on the idea'
	 	};

	 	$scope.getActivities = function(){
			activityService.getData().then(function (response) {

	 			$scope.recentActivities = response.data.recentActivities;
		 		$scope.activityTime = $scope.getActivityTime($scope.recentActivities);
		 		
		 	});
	 	};

 		$scope.getActivities();
	 	
	 	$scope.getActivityTime = function( activityTime ){
	 		
	 		var time;
	 		var activityTimeArray = [];

	 		var max = Math.max.apply(null, activityTime.map(function(item) {
			    return item.postDate;
			}));

	 		for (var i = 0; i < activityTime.length; i++) {
	 			time = ( new Date(max)).getMinutes() - (new Date(activityTime[i].postDate)).getMinutes();

	 			activityTimeArray[i] = ( time > 1 )? time + ' minutes ago' : (time === 1)? 'a minute ago' : 'a few seconds ago';
		 	}

		 	return activityTimeArray;
	 	};


	}]);
}());