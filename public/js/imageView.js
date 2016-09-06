$( document ).ready(function() {
	$('#imageView').on('show.bs.modal', function (event) {
	  var image = $(event.relatedTarget);
	  var src = image.data('imagesrc');
	  var modal = $(this);
	  modal.find('img').attr('src', src);
	});
});
