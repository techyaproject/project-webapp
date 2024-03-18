const router = require("express").Router();
const cardsControllers = require("../controllers/cardsControllers");
const { isLoggedIn } = require("../middlewares/checkToken");
const { checkNewCard } = require("../middlewares/validateRequest");

router
   .use(isLoggedIn)
	.get("/", cardsControllers.getAllArticles)
	.get("/:id", cardsControllers.getOneArticle)
	.post("/", isLoggedIn, checkNewCard, cardsControllers.createArticle)
	.put("/:id", isLoggedIn, cardsControllers.updateArticle)
	.delete("/:id", isLoggedIn, cardsControllers.deleteOneArticle);

module.exports = router;
