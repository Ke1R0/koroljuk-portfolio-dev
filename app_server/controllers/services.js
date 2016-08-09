/* GET services page */
module.exports.mainPage = function(req, res, next) {
	res.render('index', { title: 'Художник Анна Королюк'});
};
/* GET prices and delivery page */
module.exports.pricesAndDelivery = function(req, res, next) {
  res.render('prices_and_delivery', { title: 'Художник Анна Королюк'});
};
