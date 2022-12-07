import React from 'react'
import { useEffect } from 'react'
import StoryCard from "../../components/StoryCard/StoryCard"
import * as newsAPI from "../../utilities/news-api";


export default function SavedStoryPage({savedStories, handleDelete, setSavedStories}) {

  useEffect(function() {
    console.log("test")
    console.log(savedStories)
    async function fetchStory () {
      const stories = await newsAPI.getSavedStories()
      setSavedStories(stories)
    }
    fetchStory()
  },[])

  console.log(savedStories, "this is saved stories")
  return (
    <>
    { savedStories.length > 0 ?
    <div>{savedStories.map((story, idx) => {
        return <StoryCard story={story} key={idx} handleDelete={handleDelete} setSavedStories={setSavedStories} savedStories={savedStories}/> ;
    })}
    </div>
    :
    <div>No Saved Stories</div>
    }
    </>
  )
}
