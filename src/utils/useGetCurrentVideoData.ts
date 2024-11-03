import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentVideo } from "../store/slices/videoSlice";

const useGetCurrentVideoData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const video = sessionStorage.getItem("video");
    if (video) {
      dispatch(setCurrentVideo(JSON.parse(video)));
    }
  }, []);
}
export default useGetCurrentVideoData;