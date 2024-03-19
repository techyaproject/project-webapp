const Entry = require("../models/Entry");

exports.getAllEntries = async (req, res) => {
	try {
		const allEntries = await Entry.find({});
		return res.json({
			message: "All Entries fetched successfully",
			data: {
				allEntries
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

exports.getOneEntry = async (req, res) => {
	try {
		const EntryId = req.params.id;
		const foundEntry = await Entry.findById(EntryId);
		if (!foundEntry) {
			return res.status(404).json({
				message: "Entry not found!",
				data: null
			});
		}

		return res.status(200).json({
			message: "Entry fetched successfully",
			data: foundEntry
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.createEntry = async (req, res) => {
	try {
      const EntryDetails = req.body;
		const newEntry = await Entry.create(EntryDetails);

		return res.status(201).json({
			message: "Entry created successfully",
			data: newEntry
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.updateEntry = async (req, res) => {
	try {

		const EntryId = req.params.id;
		const foundEntry = await Entry.findOne({ _id: EntryId });
		if (!foundEntry) {
			return res.status(404).json({
				message: "Entry not found!",
				data: null
			});
		}
		const updatedEntry = await Entry.findOneAndUpdate({ _id: EntryId }, req.body, {new: true});
		return res.status(201).json({
			message: "Entry Updated successfully",
			data: updatedEntry
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
			data: null
		});
	}
};

exports.deleteOneEntry = async (req, res) => {
	try {
		const EntryId = req.params.id;
		const foundEntry = await Entry.findOne({ _id: EntryId });
		if (!foundEntry) {
			return res.status(404).json({
				message: "Entry not found!",
				data: null
			});
		}

		const deletedEntry = await Entry.findByIdAndDelete(EntryId);
		return res.status(200).json({
			message: "Entry deleted successfully",
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
