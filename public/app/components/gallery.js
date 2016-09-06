'use strict';
angular.
	module('gallery').
	component('gallery', {
		templateUrl: 'gallery/list',
		controller: ['$http', function GalleryController($http) {
			var self = this;
			$http.get('app/content/gallery.json').then(function(response) {
				self.images = response.data;
			});
		}]
	});
