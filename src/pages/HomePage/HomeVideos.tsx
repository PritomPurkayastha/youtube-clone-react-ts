import React, { useEffect } from "react";
import { fetchVideoList, YouTubeVideo } from "../../store/slices/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import VideoCard from "../../components/commons/VideoCard";

const HomeVideos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector(
    (state: RootState) => state.category.selectedCategoryId
  );
  const videoList = useSelector(
    (state: RootState) => state.video.homeVideoList
  );

  useEffect(() => {
    dispatch(fetchVideoList(category));
  }, [dispatch, category]);

  return (
    <div className="grid gap-4 p-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
      {videoList.map((video: YouTubeVideo) => (
        <VideoCard video={video} key={video.id}/>
      ))}
    </div>
  );
};

export default HomeVideos;
