const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const cardsRoutes = require("./routes/cardsRoutes");
const entriesRoutes = require("./routes/entriesRoutes");
const readCardRoutes = require("./routes/readCardRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
	res.send(`Welcome to the Backend!`);
});

app
	.use("/auth", authRoutes)
	.use("/cards", cardsRoutes)
	.use("/entries-log", entriesRoutes)
	.use("/read-card", readCardRoutes)

	.use("*", (req, res) => {
		return res.status(404).json({
			message: "Route not found"
		});
	});

module.exports = app;
