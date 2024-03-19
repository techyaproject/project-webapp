const router = require("express").Router();
const cardsControllers = require("../controllers/cardsControllers");
const { isLoggedIn } = require("../middlewares/checkToken");
const { checkNewCard } = require("../middlewares/validateRequest");

router
   .use(isLoggedIn)
	.get("/", cardsControllers.getAllArticles)
	.get("/:id", cardsControllers.getOneArticle)
	.post("/", checkNewCard, cardsControllers.createArticle)
	.put("/:id", cardsControllers.updateArticle)
	.delete("/:id", cardsControllers.deleteOneArticle);

module.exports = router;
