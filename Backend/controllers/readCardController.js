const Entry = require("../models/Entry");
const ReadCard = require("../models/Card-Read");

exports.getMostRecentReadCard = async (req, res) => {
	try {
      const mostRecentCard = await ReadCard.findOne().sort({ created_at: -1 });
      if (!mostRecentCard) {
         return res.status(404).json({
            message: "No card found!",
            data: null
         });
      }

      return res.status(200).json({
         message: "Most recent card fetched successfully",
         data: mostRecentCard
      });   
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         message: error.message,
         data: null
      });
   }
};

exports.readCard = async (req, res) => {
	try {
      const { serial_number } = req.body;
      if(!serial_number) {
         return res.status(400).json({
            message: "Please provide card serial number",
            data: null
         });
      }
      const newReadCard = await ReadCard.create({ serial_number });
      return res.status(201).json({
         message: "Card read successfully",
         data: newReadCard
      });

   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         message: error.message,
         data: null
      });
   }
};

