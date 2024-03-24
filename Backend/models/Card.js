const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	owner_name: {
		type: String,
		required: [true, "Please enter the card owner's name"]
	},
	owner_email: {
		type: String,
		required: [true, "Please enter the card owner's email"],
	},
	owner_department: {
		type: String,
		required: [true, "Please enter the card owner's department"]
	},
	owner_matric: {
		type: String,
		required: [true, "Please enter the card owner's matric number"]
	},
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
		default: Date.now()
	}
});

module.exports = mongoose.model("Card", cardSchema);
