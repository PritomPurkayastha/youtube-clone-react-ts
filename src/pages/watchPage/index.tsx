import { useEffect } from 'react'
import Video from './Video'
import Comments from './Comments'
import RecommendedVideos from './RecommendedVideos'
import Description from './Description'
import { fetchSingleVideoData, setCurrentVideo, YouTubeVideo } from "../../store/slices/videoSlice";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { fetchTopLevelComments, resetComments } from '../../store/slices/commentSlice'
import useGetCurrentVideoData from '../../utils/useGetCurrentVideoData'
import { useNavigate, useSearchParams } from 'react-router-dom'

const WatchPage = () => {
  type videoType = YouTubeVideo | null;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentVideo: videoType = useSelector((state: RootState) => state.video.currentVideoData);
  const [searchParams] = useSearchParams();
  const videoId: string | null = searchParams.get('v');
  useGetCurrentVideoData();

  useEffect(() => {
    fetchVideoData();
  },[])

  const fetchVideoData = async () => {
    if (!videoId) return;
    const resultAction = await dispatch(fetchSingleVideoData(videoId));
    try {
      if (fetchSingleVideoData.fulfilled.match(resultAction)) {
        debugger;
        dispatch(setCurrentVideo(resultAction.payload.items[0]));
        dispatch(fetchTopLevelComments({ videoId: resultAction.payload.items[0].id }));
        dispatch(resetComments());
      } else if (fetchSingleVideoData.rejected.match(resultAction)) {
        console.error(
          "Failed to fetch video data: ",
          resultAction.error.message
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching video data:", error);
    }
  }

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