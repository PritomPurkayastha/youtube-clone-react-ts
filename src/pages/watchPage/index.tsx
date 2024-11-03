import { useEffect } from 'react'
import Video from './Video'
import Comments from './Comments'
import RecommendedVideos from './RecommendedVideos'
import Description from './Description'
import { YouTubeVideo } from "../../store/slices/videoSlice";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { fetchTopLevelComments } from '../../store/slices/commentSlice'
import useGetCurrentVideoData from '../../utils/useGetCurrentVideoData'

const WatchPage = () => {
  type videoType = YouTubeVideo | null;
  const dispatch = useDispatch<AppDispatch>();
  const currentVideo: videoType = useSelector((state: RootState) => state.video.currentVideoData);
  useGetCurrentVideoData();

  useEffect(() => {
    if (currentVideo) {
      dispatch(fetchTopLevelComments({ videoId: currentVideo.id }));
    }
  },[currentVideo])
  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 px-4 xl:pl-28 h-full'>
      <div className='col-span-12 lg:col-span-8 flex flex-col items-start'>
        <Video />
        <Description />
        <div className='col-span-12 hidden lg:flex flex-col w-full'>
          <Comments />
        </div>
      </div>
      <div className='col-span-12 lg:col-span-4 h-[max-content] flex-grow'>
        <RecommendedVideos />
      </div>
      <div className='flex flex-col col-span-12 lg:hidden w-full'>
        <Comments />
      </div>
    </div>
  )
}

export default WatchPage