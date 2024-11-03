import { formatDate, formatNumber } from "../../utils/helper";
import avatar from "../../assets/avatar-default-symbolic-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { resetComments } from "../../store/slices/commentSlice";
import {
  fetchSingleVideoData,
} from "../../store/slices/videoSlice";
import { Bookmark, Clock5, EllipsisVertical, Flag, ListVideo, Share } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useHandleClickOutside from "../../utils/useHandleClickOutside";

type Props = {
  thumbnail: string;
  title: string;
  viewCount: number;
  publishedAt: string;
  description: string;
  channelTitle: string;
  videoId: string;
};

const VideoInfoCard = ({
  thumbnail,
  title,
  viewCount,
  publishedAt,
  description,
  channelTitle,
  videoId,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useHandleClickOutside(dropdownRef, () => setShowOptions(false), buttonRef);

  const handleVideoPlay = async (id: string) => {
    try {
      const resultAction = await dispatch(fetchSingleVideoData(id));

      if (fetchSingleVideoData.fulfilled.match(resultAction)) {
        sessionStorage.setItem(
          "video",
          JSON.stringify(resultAction.payload.items[0])
        );
        dispatch(resetComments());
        navigate(`/watch?v=${id}`);
      } else if (fetchSingleVideoData.rejected.match(resultAction)) {
        console.error(
          "Failed to fetch video data: ",
          resultAction.error.message
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching video data:", error);
    }
  };
  const handleEllipsis = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow > 50) {
        setDropdownPosition("bottom");
      } else if (spaceAbove > 200) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
    setShowOptions(!showOptions);
  };
  return (
    <div
      className="grid grid-cols-12 h-[max-content] p-4 cursor-pointer"
    >
      <div className="col-span-6 h-[300px]" onClick={() => handleVideoPlay(videoId)}>
        <img src={thumbnail} className="h-full w-full rounded-md" />
      </div>
      <div className="col-span-5 flex flex-col pl-4" onClick={() => handleVideoPlay(videoId)}>
        <span className="font-medium text-[#F1F1F1] text-[18px] pb-2 overflow-hidden text-ellipsis max-h-12 leading-6">
          {title}
        </span>
        <div className="flex items-center gap-2 pb-4">
          <span className="text-[12px] text-[#AAAAAA] gap-2">
            {formatNumber(JSON.stringify(viewCount))}
          </span>
          <span className="text-[12px] text-[#AAAAAA]">.</span>
          <span className="text-[12px] text-[#AAAAAA] gap-2">
            {formatDate(publishedAt)}
          </span>
        </div>
        <div className="flex items-center gap-2 pb-4">
          <img
            src={avatar}
            className="rounded-full h-8 bg-gray-500 bg-opacity-50 p-1"
          />
          <span className="text-[12px] text-[#AAAAAA] font-medium overflow-hidden text-ellipsis whitespace-nowrap hover:text-[#fff]">
            {channelTitle}
          </span>
        </div>
        <span className="text-[12px] text-[#AAAAAA] font-medium font-serif overflow-hidden text-ellipsis max-h-12 leading-6">
          {description}
        </span>
      </div>
      <div className="col-span-1">
        <span
          className="w-[max-content] float-right relative"
          ref={buttonRef}
          onClick={handleEllipsis}
        >
          <EllipsisVertical />
          {showOptions && (
            <div
              className={`flex flex-col absolute z-100 bg-[#282828] rounded-lg right-1 w-[max-contenr] ${
                dropdownPosition === "bottom"
                  ? "top-full"
                  : "bottom-full mb-2"
              }`}
              ref={dropdownRef}
            >
              <div className="flex flex-col py-1 cursor-pointer">
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <ListVideo />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">Add to queue</span>
                </div>
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <Clock5 />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">Save to Watch later</span>
                </div>
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <Bookmark />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">Save to playlist</span>
                </div>
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <Share />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">Share</span>
                </div>
                <div className="h-[1px] w-full bg-[#fffaaa] mt-2"></div>
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <Flag />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">Report</span>
                </div>
              </div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};
export default VideoInfoCard;
