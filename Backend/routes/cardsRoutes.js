const router = require("express").Router();
const cardsControllers = require("../controllers/cardsControllers");
const { isLoggedIn } = require("../middlewares/checkToken");
const { checkNewCard } = require("../middlewares/validateRequest");

router
   .use(isLoggedIn)
	.get("/", cardsControllers.getAllCards)
	.get("/:id", cardsControllers.getOneCard)
	.post("/", checkNewCard, cardsControllers.createCard)
	.put("/:id", cardsControllers.updateCard)
	.delete("/:id", cardsControllers.deleteOneCard);

module.exports = router;
