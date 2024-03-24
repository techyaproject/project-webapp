const mongoose = require("mongoose");

const entrychema = new mongoose.Schema({
	card_serial_number: {
		type: String,
		required: [true, "Please enter card serial number"],
	},
	card_holder: {
		type: String,
		required: [true, "Please enter the card holder's name"]
	},
	entry_status: {
		type: String,
		enum: ["admitted", "disallowed"]
	},
	entry_time: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("Entry", entrychema);
