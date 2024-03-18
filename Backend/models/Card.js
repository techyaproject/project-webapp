const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	serial_number: {
		type: String,
		required: [true, "Please enter card serial number"],
		unique: true
	},
	card_holder: {
		type: String,
		required: [true, "Please enter the card holder's name"]
	},
	active: {
		type: Boolean,
		default: true
	},
	user_role:{
		type: String,
		enum: ["user", "admin"],
		default: "user"
	},
	created_at: {
		type: Date,
		default: new Date.now()
	}
});

module.exports = mongoose.model("Card", cardSchema);
