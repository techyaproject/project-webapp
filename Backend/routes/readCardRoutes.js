const router = require("express").Router();
const readCardControllers = require("../controllers/readCardController");
const { isLoggedIn } = require("../middlewares/checkToken");

router
	// .get("/", isLoggedIn, readCardControllers.getAllEntries)
	.get("/latest", isLoggedIn, readCardControllers.getMostRecentReadCard)
	.post("/", readCardControllers.readCard);
// .put("/:id", isLoggedIn, readCardControllers.updateArticle)
// .delete("/:id", isLoggedIn, readCardControllers.deleteOneArticle);

module.exports = router;
