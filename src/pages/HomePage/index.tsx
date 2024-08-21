import React from 'react'
import Categories from './Categories'
import HomeVideos from './HomeVideos'

const HomePage = () => {

  return (
    <div className='flex flex-col'>
      <Categories/>
      <HomeVideos />
    </div>
  )
}

export default HomePage;