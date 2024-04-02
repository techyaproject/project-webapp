const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
	try {
		const newUser = await User.create({
			...req.body,
			password: await bcrypt.hash(req.body.password, 10)
		});

		const token = await jwt.sign(
			{
				id: newUser._id,
				first_name: newUser.first_name,
				last_name: newUser.last_name,
				email: newUser.email
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res.status(201).json({
			message: "User created successfully",
			data: newUser,
			token
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.signin = async (req, res) => {
	try {
		const foundUser = await User.findOne({ email: req.body.email });
		if (!foundUser) {
			return res.status(404).json({
				message: "User not found!",
				data: null
			});
		}

		const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
		if (!isMatch) {
			return res.status(401).json({
				message: "Incorrect Password!",
				data: null
			});
		}

		const token = await jwt.sign(
			{
				id: foundUser._id,
				first_name: foundUser.first_name,
				last_name: foundUser.last_name,
				email: foundUser.email
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		return res.status(201).json({
			message: "User signed in successfully",
			data: foundUser,
			token
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.getAllAdmins = async (req, res) => {
	try {
		const admins = await User.find({});
		return res.status(200).json({
			message: "Admins fetched successfully",
			data: admins
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.deleteAdmin = async (req, res) => {
	try {
		const deletedAdmin = await User.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			message: "Admin deleted successfully",
			data: deletedAdmin
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
}

exports.signout = async (req, res) => {
	try {
		return res.json({
			message: "Logged out successfully",
			data: null
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};
