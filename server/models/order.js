var mongoose = require('mongoose');
var Schema = mongoose.Schema

var OrderSchema = new Schema({
	product: {
		type: String,
		required: true
	},
	customer: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: new Date
	},
	quantity: {
		type: Number,
		min: 0
	}
})

var Order = mongoose.model('Order', OrderSchema);
