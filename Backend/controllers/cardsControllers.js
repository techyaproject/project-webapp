const Card = require("../models/Card");

exports.getAllCards = async (req, res) => {
	try {
		const allCards = await Card.find({});
		return res.json({
			message: "All Cards fetched successfully",
			data: {
				allCards
			}
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.getOneCard = async (req, res) => {
	try {
		const CardId = req.params.id;
		const foundCard = await Card.findById(CardId);
		if (!foundCard) {
			return res.status(404).json({
				message: "Card not found!",
				data: null
			});
		}

		return res.status(200).json({
			message: "Card fetched successfully",
			data: foundCard
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.createCard = async (req, res) => {
	try {
      const cardDetails = req.body;
		const newCard = await Card.create(cardDetails);

		return res.status(201).json({
			message: "Card created successfully",
			data: newCard
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.updateCard = async (req, res) => {
	try {

		const CardId = req.params.id;
		const foundCard = await Card.findOne({ _id: CardId });
		if (!foundCard) {
			return res.status(404).json({
				message: "Card not found!",
				data: null
			});
		}
		const updatedCard = await Card.findOneAndUpdate({ _id: CardId }, req.body, {new: true});
		return res.status(201).json({
			message: "Card Updated successfully",
			data: updatedCard
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.deleteOneCard = async (req, res) => {
	try {
		const CardId = req.params.id;
		const foundCard = await Card.findOne({ _id: CardId });
		if (!foundCard) {
			return res.status(404).json({
				message: "Card not found!",
				data: null
			});
		}

		const deletedCard = await Card.findByIdAndDelete(CardId);
		return res.status(200).json({
			message: "Card deleted successfully",
			data: null
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};
