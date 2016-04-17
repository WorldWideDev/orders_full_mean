var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');

var customers = require('../controllers/customers.js')
var orders = require('../controllers/orders.js')

module.exports = function(app){
	app.get('/customers/index', function (req,res){
		customers.index(req,res)
	})
	app.post('/customers/create', function (req,res){
		console.log(req.body+' is post data')
		customers.create(req,res);
	})
	app.get('/customers/delete/:id', function (req,res){
		customers.delete(req,res)
	})
	app.get('/orders/index', function (req,res){
		orders.index(req,res)
	})
	app.post('/orders/create', function (req,res){
		orders.create(req,res)
	})
}