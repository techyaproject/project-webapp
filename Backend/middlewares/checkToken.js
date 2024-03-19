const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
	try {
		// get token from Bearer authorization header
		const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

		if (!token) {
			return res.status(401).json({
			    message: "Kindly Login!",
			    data: null
			});
		}

		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		// console.log("error here")
		return res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

