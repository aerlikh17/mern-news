require("dotenv").config();
const Story = require("../../models/story");

module.exports = {
  topStories,
  saveStory,
  getSavedStories,
  fetchStory,
  search,
  deleteStory,
};

async function topStories(req, res) {
  const newsUrl = new URL("https://newsapi.org/v2/top-headlines?");
  const params = new URLSearchParams({
    language: "en",
    country: "ca",
    apiKey: process.env.NEWS_KEY,
  });
  try {
    const response = await fetch(`${newsUrl}${params}`);
    const body = await response.json();
    let savedStories = await Story.find({
      user: req.user._id,
    });
    res.json(body);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function saveStory(req, res) {
  if (!req.body.author) req.body.author = "Unknown author";
  if (!req.body.content) req.body.content = "No content";
  try {
    let story = await Story.create({
      source: req.body.source.name,
      author: req.body.author,
      title: req.body.title,
      url: req.body.url,
      urlToImage: req.body.urlToImage,
      description: req.body.description,
      content: req.body.content,
      user: req.user._id,
    });
    res.status(200).json(story);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getSavedStories(req, res) {
  console.log(req.user._id, "USER ID");
  try {
    let stories = await Story.find({
      user: req.user._id,
    });
    res.status(200).json(stories);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function fetchStory(req, res) {
  try {
    let story = await Story.findOne({ url: req.params.url });
    res.status(200).json(story);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteStory(req, res) {
  try {
    let storyDeleted = await Story.findByIdAndDelete(req.params.id);
    res.status(200).json(storyDeleted);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function search(req, res) {
  const newsUrl = new URL("https://newsapi.org/v2/everything?");
  const params = new URLSearchParams({
    q: req.body.search,
    language: "en",
    pageSize: 20,
    apiKey: process.env.NEWS_KEY,
  });
  try {
    const response = await fetch(`${newsUrl}${params}`);
    const body = await response.json();
    res.json(body);
  } catch (error) {
    res.status(400).json(error);
  }
}
