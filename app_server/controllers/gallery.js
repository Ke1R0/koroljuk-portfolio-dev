/* GET gallery page */
module.exports.mainPage = function(req, res, next) {
	res.render('gallery', { title: 'Художник Анна Королюк'});
};
/* GET gallery list */
module.exports.list = function(req, res, next) {
	res.render('templates/gallery-list');
};
