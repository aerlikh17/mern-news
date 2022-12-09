const express = require("express");
const router = express.Router();
const newsCtrl = require("../../controllers/news/news-api");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/topstories", ensureLoggedIn, newsCtrl.topStories);
router.get("/savedstories", ensureLoggedIn, newsCtrl.getSavedStories);
router.post("/saveStory", ensureLoggedIn, newsCtrl.saveStory);
router.get("/:url", ensureLoggedIn, newsCtrl.fetchStory);
router.get("/topstories", newsCtrl.topStories);
router.post("/search", newsCtrl.search);
router.delete("/:id", ensureLoggedIn, newsCtrl.deleteStory);

module.exports = router;
