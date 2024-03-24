const joi = require("joi");

exports.checkNewUser = async (req, res, next) => {
	const schema = joi.object({
		first_name: joi.string().required(),
		last_name: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().required()
	});

	try {
		const value = await schema.validateAsync(req.body);
	} catch (error) {
		return res.status(422).json({ message: error.details[0].message, data: null });
	}
	next();
};

exports.checkLogin = async (req, res, next) => {
	const schema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().required()
	});

	try {
		const value = await schema.validateAsync(req.body);
	} catch (error) {
		return res.status(422).json({ message: error.details[0].message, data: null });
	}
	next();
};

exports.checkNewCard = async (req, res, next) => {
	const schema = joi.object({
		serial_number: joi.string().required(),
		card_holder: joi.string().required(),
		owner_name: joi.string().required(),
		owner_email: joi.string().email().required(),
		owner_department: joi.string().required(),
		owner_matric: joi.string().required()
	});

	try {
		const value = await schema.validateAsync(req.body);
	} catch (error) {
		return res.status(422).json({ message: error.details[0].message, data: null });
	}
	next();
};

exports.checkEntryDetails = async (req, res, next) => {
	const schema = joi.object({
		card_serial_number: joi.string().required()
	});

	try {
		const value = await schema.validateAsync(req.body);
	} catch (error) {
		return res.status(422).json({ message: error.details[0].message, data: null });
	}
	next();
};
