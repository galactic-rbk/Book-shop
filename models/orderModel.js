const mongoose = require('mongoose');

const oredrSchema = mongoose.Schema({
	title:{
		type: String,
		required: true,
		// unique: true
	},
	price:{
		type: String,
		required: true,
		// unique: true
	},
	image_url:{
		type: String
	}
})
const Order = module.exports = mongoose.model('Order', oredrSchema);

// Get Orders from mongo data base
module.exports.getOrders = (callback) => {
	Order.find(callback);
}

// Add Order to mongo data base
module.exports.addOrder = (order, callback) => {
	Order.create(order, callback);
}