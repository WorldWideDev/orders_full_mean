var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports = {
	index: function(req, res){
		console.log('in order index');
		Order.find({}, function (err, orders){
			res.json(orders)
		})
	},
	create: function(req,res){
		console.log(req.body)
		var order = new Order({
			product: req.body.product,
			customer: req.body.customer,
			createdAt: new Date,
			quantity: req.body.quantity
		})
		console.log(order)
		order.save(function (err){
			if(err){
				console.log('somethings amiss')
				res.json(err)
			}else{
				console.log('successfully added an order')
				res.redirect('/orders/index')
			}
		})
	}
}