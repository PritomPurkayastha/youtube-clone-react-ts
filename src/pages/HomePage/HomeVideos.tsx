import { YouTubeVideo } from "../../store/slices/videoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import VideoCard from "../../components/commons/VideoCard";

const HomeVideos = () => {
  const videoList = useSelector(
    (state: RootState) => state.video.homeVideoList
  );

  return (
    <div className="grid gap-4 p-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
      {videoList.map((video: YouTubeVideo, index: any) => (
        <VideoCard video={video} key={video.id} isPriority={index === 0}/>
      ))}
    </div>
  );
};

export default HomeVideos;
