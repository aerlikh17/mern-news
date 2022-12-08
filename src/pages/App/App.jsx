import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import SearchPage from "../SearchPage/SearchPage";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import TopStoryPage from "../TopStoryPage/TopStoryPage";
import SavedStoriesPage from "../SavedStoriesPage/SavedStoriesPage";
import * as newsAPI from "../../utilities/news-api";
import DetailsPage from "../DetailsPage/DetailsPage";
import { StoreSharp } from "@mui/icons-material";
import axios from "axios";

function App() {
  const [user, setUser] = useState(getUser());
  const [topStories, setTopStories] = useState([]);
  const [savedStories, setSavedStories] = useState([]);
  const [searchStories, setSearchStories] = useState([]);
  const [currentStory, setCurrentStory] = useState([]);

  useEffect(
    function () {
      async function getStory() {
        const stories = await newsAPI.topStories();
        setTopStories(stories.articles);
      }
      async function saveStory() {
        const stories = await newsAPI.getSavedStories();
        setSavedStories(stories);
      }
      getStory();
      saveStory();
    },
    [user]
  );

  async function getSearch(query) {
    const stories = await newsAPI.searchStories(query);
    setSearchStories(stories.articles);
  }

  async function handleSave(story) {
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    axios
      .post("/api/news/saveStory", story, {
        headers: headers,
      })
      .then((result) => {
        setSavedStories([...savedStories, result.data]);
      });
  }

  function handleDelete(id) {
    setSavedStories(savedStories.filter((story) => story._id !== id));
    const token = localStorage.getItem("token");
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    axios.delete(`/api/news/${id}`, { headers: headers });
  }

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Navigate to="/stories/top" />} />
            <Route
              path="/stories/top"
              element={
                <TopStoryPage
                  topStories={topStories}
                  savedStories={savedStories}
                  setSavedStories={setSavedStories}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  setCurrentStory={setCurrentStory}
                  user={user}
                />
              }
            />
            <Route
              path="/stories/saved"
              element={
                <SavedStoriesPage
                  savedStories={savedStories}
                  setSavedStories={setSavedStories}
                  handleDelete={handleDelete}
                  setCurrentStory={setCurrentStory}
                />
              }
            />
            <Route
              path="/stories/detail"
              element={
                <DetailsPage
                  story={currentStory}
                  savedStories={savedStories}
                  setSavedStories={setSavedStories}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  user={user}
                />
              }
            />
            <Route
              path="/search"
              element={
                <SearchPage
                  getSearch={getSearch}
                  searchStories={searchStories}
                  savedStories={savedStories}
                  setSavedStories={setSavedStories}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  setCurrentStory={setCurrentStory}
                  user={user}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
