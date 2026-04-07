import { useEffect, useState } from "react";
import { YouTubeVideo } from "../../store/slices/videoSlice";
import { formatDate, formatNumber } from "../../utils/helper";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import useGetCurrentVideoData from "../../utils/useGetCurrentVideoData";

const Description = () => {
  const dispatch = useDispatch();
  type videoType = YouTubeVideo | null;
  const currentVideo: videoType = useSelector((state: RootState) => state.video.currentVideoData);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  // useGetCurrentVideoData();

  return (
    <div className="rounded-md bg-[#FFFFFF1A] max-h-[max-content] p-4 flex flex-col items-start my-4 w-full">
      <div className="flex flex-col gap-2 text-[#F1F1F1] font-bold text-sm">
        <div className="flex items-center gap-2">
          <span>
            {currentVideo && formatNumber(currentVideo?.statistics.viewCount)}{" "}
            views
          </span>
          <span>
            {currentVideo && formatDate(currentVideo?.snippet.publishedAt)}
          </span>
        </div>
        {!showFullDescription ? (
          <div
            className="block relative contain-content overflow-hidden cursor-pointer"
            onClick={() => setShowFullDescription(true)}
          >
            <div className="max-h-[80px] text-ellipsis overflow-hidden whitespace-pre-wrap relative mask-desc">
              {currentVideo?.snippet.description}
            </div>
            <span className="absolute z-10 bottom-0 left-10 bg-[#FFFFFF1AAA] w-full">
              ...more
            </span>
          </div>
        ) : (
          <div>
            <div className="max-h-[max-content] overflow-hidden whitespace-pre-wrap">
              {currentVideo?.snippet.description}
            </div>
            <span
              className="cursor-pointer"
              onClick={() => setShowFullDescription(false)}
            >
              Show less
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
