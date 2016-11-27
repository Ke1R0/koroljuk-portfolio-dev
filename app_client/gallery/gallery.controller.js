(function() {
  angular.module('portfolio')
    .controller('galleryCtrl', galleryCtrl);
  function galleryCtrl(galleryData) {
    var vm = this;
    vm.showModalImage = function(imageSrc) {
      vm.previewSrc = imageSrc;
    };
    galleryData.getData()
      .success(function(data) {
        vm.data = {
          images: data
        };
      })
      .error(function(e) {
        vm.message = "Data service unavailable.";
      });
  };
})()
