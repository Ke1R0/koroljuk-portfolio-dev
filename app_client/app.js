(function() {
  angular.module('portfolio', ['ngRoute']);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/prices', {
        templateUrl: 'prices/prices.view.html',
        controller: 'pricesCtrl',
        controllerAs: 'vm'
      })
      .when('/gallery', {
        templateUrl: 'gallery/gallery.view.html',
        controller: 'galleryCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  };

  angular.module('portfolio')
    .config(['$routeProvider', '$locationProvider', config]);
})();
