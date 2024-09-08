import React from 'react'
import Video from './Video'
import Comments from './Comments'
import RecommendedVideos from './RecommendedVideos'
import Description from './Description'

type Props = {}

const WatchPage = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 px-4 xl:pl-28 h-full'>
      <div className='col-span-12 lg:col-span-8 flex flex-col items-start'>
        <Video />
        <Description />
        <div className='col-span-12 hidden lg:flex flex-col w-full'>
          <Comments />
        </div>
      </div>
      <div className='col-span-12 lg:col-span-4 h-[100vh]'>
        <RecommendedVideos />
      </div>
      <div className='flex flex-col col-span-12 lg:hidden w-full'>
        <Comments />
      </div>
    </div>
  )
}

export default WatchPage