import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import video from './Video';
import { fetchVideoList, YouTubeVideo } from '../../store/slices/videoSlice';
import VideoInfoCard from '../../components/commons/VideoInfoCard';
import VideoCard from '../../components/commons/VideoCard';
import RecommendedVideoCard from '../../components/commons/RecommondedVideoCard';


const RecommendedVideos = () => {
  type videoType = YouTubeVideo | null;
  const dispatch = useDispatch<AppDispatch>();
  const videoList = useSelector(
    (state: RootState) => state.video.homeVideoList
  );
  const [currentVideo, setCurrentVideo] = useState<videoType>(null);
  useEffect(() => {
    const video = sessionStorage.getItem("video");
    if (video) {
      setCurrentVideo(JSON.parse(video));
    }
    dispatch(fetchVideoList(currentVideo? currentVideo.snippet.categoryId : '0'));
  }, [])
  return (
    <>
      {videoList.map((video: YouTubeVideo) => (
        <div className='flex flex-col h-[max-content] px-4 py-2' key={video.id}>
          <RecommendedVideoCard 
            thumbnail={video.snippet.thumbnails.medium.url}
            title={video.snippet.title}
            viewCount={Number(video.statistics.viewCount)}
            publishedAt={video.snippet.publishedAt}
            description={video.snippet.description}
            channelTitle={video.snippet.channelTitle}
            videoId={video.id}
            type={'recommendedVideo'}
          />
        </div>
      ))}
    </>
  )
}

export default RecommendedVideos