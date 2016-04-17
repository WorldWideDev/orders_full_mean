var mongoose = require('mongoose');
var Schema = mongoose.Schema

var CustomerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: new Date
	},
	_order: {
		type: Schema.Types.ObjectId,
		ref: 'Order'
	}
})

var Customer = mongoose.model('Customer', CustomerSchema);
