var myApp = angular.module('myApp', ['ngRoute']);
console.log('in script')
myApp.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/customers.html'
	})
	.when('/orders', {
		templateUrl: 'partials/orders.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})
myApp.factory('CustFactory', function($http){
	var factory = {}
	factory.index = function(callback){
		$http.get('/customers/index').success(function(meow){
			console.log(meow)
			callback(meow)
		})
	}
	factory.create = function(info, callback){
		console.log(info)
		$http.post('/customers/create', info).success(function(meow){
			callback(meow)
		})
	}
	factory.delete = function(info, callback){
		$http.get('/customers/delete/' + info._id).success(function(meow){
			callback(meow)
		})
	}
	return factory
})
myApp.factory('OrderFactory', function($http){
	var factory = {}
	var products = ['Unicorn', 'Dirty Vans', 'Pizza', 'Can o Corn']
	factory.index = function(callback){
		$http.get('/orders/index').success(function(meow){
			console.log(meow)
			callback(meow);
		})
	}
	factory.getProducts = function(){
		return products
	}
	factory.create = function(info, callback){
		console.log(info)
		$http.post('/orders/create', info).success(function(meow){
			callback(meow)
		})
	}
	return factory
})
myApp.controller('custController', function(CustFactory){
	self = this;
	CustFactory.index(function(data){
		console.log(data)
		self.customers = data;
	})
	self.create = function(){
		CustFactory.create(self.new_cust, function(data){
			console.log(data)
			if(!data[0].err){
				self.customers.push(data)
			}else{
				self.err = data
			}
		})
		self.new_cust = ''
	}
	self.delete = function (customer){
		CustFactory.delete(customer, function(data){
			self.customers = data
		})
	}
})
myApp.controller('orderController', function(CustFactory, OrderFactory){
	self = this;
	self.products = OrderFactory.getProducts()
	console.log(self.products)
	CustFactory.index(function(data){
		console.log(data)
		self.customers = data;
	})
	OrderFactory.index(function(data){
		self.orders = data;
	})
	self.create = function(){
		OrderFactory.create(self.new_order, function(data){
			//self.orders.push(data)
			self.orders = data;
		})
		self.new_order = ''
	}
})