import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import SearchPage from "../SearchPage/SearchPage";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import TopStoryPage from "../TopStoryPage/TopStoryPage";
import SavedStoriesPage from "../SavedStoriesPage/SavedStoriesPage";
import * as newsAPI from "../../utilities/news-api";
import { StoreSharp } from "@mui/icons-material";
import axios from "axios";

function App() {
  const [user, setUser] = useState(getUser());
  const [topStories, setTopStories] = useState([]);
  const [savedStories, setSavedStories] = useState([]);
  const [searchStories, setSearchStories] = useState([]);

  useEffect(function () {
    async function getStory() {
      const stories = await newsAPI.topStories();
      setTopStories(stories);
    }
    async function saveStory(){
      const stories = await newsAPI.getSavedStories()
      setSavedStories(stories)
      console.log(savedStories, "saved stories")
    }
    getStory(),
    saveStory()
  },[])

  async function getSearch(query) {
    const stories = await newsAPI.searchStories(query);
    setSearchStories(stories.articles);
  }

  function handleDelete(id) {
    setSavedStories(savedStories.filter(story => story._id !== id))
    const token = localStorage.getItem("token")
    const headers = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    axios.delete(`/api/news/${id}`, {headers: headers})
  }


  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/stories/top"
              element={<TopStoryPage topStories={topStories.articles} user={user} savedStories={savedStories} setSavedStories={setSavedStories}/>}
            />
            <Route
              path="/stories/saved"
              element={
                <SavedStoriesPage savedStories={savedStories} handleDelete={handleDelete} setSavedStories={setSavedStories}/>
              }
            />
            <Route
              path="/search"
              element={
                <SearchPage
                  getSearch={getSearch}
                  searchStories={searchStories}
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
