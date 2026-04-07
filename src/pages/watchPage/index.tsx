import { useEffect } from 'react'
import Video from './Video'
import Comments from './Comments'
import RecommendedVideos from './RecommendedVideos'
import Description from './Description'
import { fetchSingleVideoData, setCurrentVideo, YouTubeVideo } from "../../store/slices/videoSlice";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { CommentThread, fetchTopLevelComments, resetComments } from '../../store/slices/commentSlice'
import useGetCurrentVideoData from '../../utils/useGetCurrentVideoData'
import { useSearchParams } from 'react-router-dom'

const WatchPage = () => {
  type videoType = YouTubeVideo | null;
  const dispatch = useDispatch<AppDispatch>();
  const currentVideo: videoType = useSelector((state: RootState) => state.video.currentVideoData);
  const isLoading = useSelector((state: RootState) => state.video.isCurrentVideoLoading);
  const commentList: CommentThread[] = useSelector((state: RootState) => state.comment.comments);
  const videoList: YouTubeVideo[] = useSelector((state: RootState) => state.video.homeVideoList);
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
        {currentVideo && <Video />}
        {currentVideo && <Description />}
        <div className='col-span-12 hidden lg:flex flex-col w-full'>
          {currentVideo && commentList.length > 0 && <Comments />}
        </div>
      </div>
      <div className='col-span-12 lg:col-span-4 h-[max-content] flex-grow'>
        {videoList.length > 0 && <RecommendedVideos />}
      </div>
      <div className='flex flex-col col-span-12 lg:hidden w-full'>
        {currentVideo && commentList.length > 0 && <Comments />}
      </div>
    </div>
  )
}

export default WatchPage