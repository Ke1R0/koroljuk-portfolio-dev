(function() {
angular
  .module('portfolio')
  .service('galleryData', galleryData);

galleryData.$inject = ['$http'];
function galleryData($http) {
  var getData = function() {
    return $http.get('/app/content/gallery.json');
  };
  return {
    getData: getData
  };
}
})();
