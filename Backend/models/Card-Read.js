const mongoose = require("mongoose");

const readCardSchema = new mongoose.Schema({
	serial_number: {
		type: String,
		required: [true, "Please enter card serial number"],
		unique: true
	},
	created_at: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("ReadCard", readCardSchema);
