const router = require("express").Router();
const entriesControllers = require("../controllers/entriesControllers");
const { isLoggedIn } = require("../middlewares/checkToken");
const { checkEntryDetails } = require("../middlewares/validateRequest");

router
	.get("/", isLoggedIn, entriesControllers.getAllEntries)
	.get("/:id", isLoggedIn, entriesControllers.getOneEntry)
	.post("/", checkEntryDetails, entriesControllers.createEntry);
// .put("/:id", isLoggedIn, entriesControllers.updateArticle)
// .delete("/:id", isLoggedIn, entriesControllers.deleteOneArticle);

module.exports = router;
