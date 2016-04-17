var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = {
	index: function(req, res){
		console.log('in cust index');
		Customer.find({}, function (err, customers){
			res.json(customers)
		})
	},
	create: function(req,res){
		console.log(req.body.name + ' in controller')
		var customer = new Customer({
			name: req.body.name,
			createdAt: new Date
		})
		Customer.find({name: req.body.name}, function(err, cust){
			if(cust.length){
				res.json([{err:'name already exists'}])
			}else{
				console.log(customer)
				customer.save(function (err){
					if(err){
						console.log('somethings amiss');
						res.json(err)
					}else{
						console.log('successfuly added a name');
						res.json(customer)
					}
				})	
			}
		})
	},
	delete: function(req,res){
		Customer.remove({_id: req.params.id}, function (err, customer){
			if(err){
				res.json(err)
			}else{
				res.redirect('/customers/index')
			}
		})
	}

}