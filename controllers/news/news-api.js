require("dotenv").config();
const Story = require("../../models/story");

module.exports = {
  topStories,
  saveStory,
  getSavedStories,
  fetchStory,
  search,
  deleteStory
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
      user: req.user._id
    })
    console.log(savedStories, "saved stories")
    console.log(body, "top stories")
    // body.articles.forEach(element => {
    //   if (!savedStories.includes(element)) {
    //     console.log("element found")
    //     filteredArticles.push(element)
    //   }
      // if (article.url !== element.url) {
      //   console.log(article.url, 'url')
      //   if (!filteredArticles.includes(article)) {
      //   filteredArticles.push(article)
      //   }
      //  }
    // })
    // body.articles = filteredArticles;
    res.json(body);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function saveStory(req, res) {
  if (!req.body.author) req.body.author = "Unknown author"
  if (!req.body.content) req.body.content = "No content"
  try {
    console.log(req.body)

    await Story.create({
      source: req.body.source.name,
      author: req.body.author,
      title: req.body.title,
      url: req.body.url,
      urlToImage: req.body.urlToImage,
      description: req.body.description,
      content: req.body.content,
      user: req.user._id
    })
    res.status(200).send("Done")
  } catch(err) {
    console.log(err)
    res.status(400).json(err);
  }
}

async function getSavedStories(req, res) {
  try {
    let stories = await Story.find({
      user: req.user._id
    })
    res.status(200).json(stories)
  } catch(err) {
    res.status(400).json(err);
  }
}

async function fetchStory(req, res) {
  try {
    let story = await Story.findOne({ url: req.params.url })
    res.status(200).json(story)
  } catch(err) {
    res.status(400).json(err);
  }
}

async function deleteStory(req, res) {
  try {
    let storyDeleted = await Story.findByIdAndDelete(req.params.id)
    res.status(200).json(storyDeleted)
  } catch(err) {
    res.status(400).json(err);
  }
}

async function search(req, res) {
  console.log(req.body.search);
  const newsUrl = new URL("https://newsapi.org/v2/everything?");
  const params = new URLSearchParams({
    q: req.body.search,
    language: "en",
    pageSize: 10,
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

