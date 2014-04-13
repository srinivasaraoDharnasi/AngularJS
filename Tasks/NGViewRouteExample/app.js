var app=angular.module('MyTutorialApp',[])
	.config(function($routeProvider){
	$routeProvider
		.when('/srinu',{
			templateUrl:'srinu.html',
			controller:'MainController'
		})
		.when('/tagore',{
			templateUrl:'tagore.html',
			controller:'MainController'
		})
		.when('/natraj',{
			templateUrl:'natraj.html',
			controller:'MainController'
		})
		.when('/sai',{
			templateUrl:'sai.html',
			controller:'MainController'
		})
		.otherwise({redirectTo:'/srinu'});
		
	});