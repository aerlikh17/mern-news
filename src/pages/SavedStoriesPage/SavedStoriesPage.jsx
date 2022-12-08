import React from "react";
import { useEffect } from "react";
import StoryCard from "../../components/StoryCard/StoryCard";
import * as newsAPI from "../../utilities/news-api";

export default function SavedStoryPage({
  savedStories,
  setSavedStories,
  handleDelete,
  setCurrentStory,
}) {
  // useEffect(function () {
  //   async function fetchStory() {
  //     const stories = await newsAPI.getSavedStories();
  //     setSavedStories(stories);
  //   }
  //   fetchStory();
  // }, []);

  return (
    <>
      {savedStories.length > 0 ? (
        <div>
          {savedStories.map((story, idx) => {
            return (
              <StoryCard
                key={idx}
                story={story}
                savedStories={savedStories}
                setSavedStories={setSavedStories}
                handleDelete={handleDelete}
                setCurrentStory={setCurrentStory}
              />
            );
          })}
        </div>
      ) : (
        <div>No Saved Stories</div>
      )}
    </>
  );
}
