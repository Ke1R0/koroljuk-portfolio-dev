'use strict';
angular.
	module('portfolio').
	config(['$locationProvider' ,'$routeProvider',
		function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');
			 $routeProvider.
				when('/Gallery', {
					template: '<gallery></gallery>'
				}).
				otherwise('/Gallery');
		}
	]);
