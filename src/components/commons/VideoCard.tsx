import React from 'react';
import { YouTubeVideo } from '../../store/slices/videoSlice';
import avatar from "../../assets/avatar-default-symbolic-svgrepo-com.svg";
import { Dot, Verified } from 'lucide-react';
import { formatDate, formatNumber } from '../../utils/helper';

type VideoCardType = {
  video: YouTubeVideo;
}

const VideoCard = ({video}: VideoCardType) => {
  const handleVideoPlay = () => {
    console.log('clicked on card');
  }

  const viewChannel = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    console.log('clciked on chennal name');
  }

  return (
    <div className="shadow-sm h-[max-content] w-[100%] flex flex-col cursor-pointer" onClick={handleVideoPlay}>
      <img src={video.snippet.thumbnails.medium.url} className='rounded-sm' />
      <div className='flex items-start justify-start py-2'>
        <img src={avatar} className='rounded-full h-8 bg-gray-500 bg-opacity-50 p-1' onClick={viewChannel}/>
        <div className='flex flex-col items-start justify-start px-2 h-[max-content]'>
          <span className='text-xl font-serif text-[#f1f1f] overflow-hidden text-ellipsis leading-8 max-h-14 h-full whitespace-normal'>{video.snippet.title}</span>
          <div className='flex items-center gap-1 pt-2'>
            <span className='text-[#aaa] hover:text-[#fff]' onClick={viewChannel}>{video.snippet.channelTitle}</span>
            <Verified className='h-4'/>
          </div>
          <div className='flex items-center gap-1 text-[#aaa]'>
            {formatNumber(video.statistics.viewCount)}
            <Dot/>
            {formatDate(video.snippet.publishedAt)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard