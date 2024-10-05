import {
  Bookmark,
  Clock5,
  Dot,
  EllipsisVertical,
  Flag,
  ListVideo,
  Share,
} from "lucide-react";
import { formatDate, formatNumber } from "../../utils/helper";
import { useEffect, useRef, useState } from "react";
import { fetchSingleVideoData } from "../../store/slices/videoSlice";
import { resetComments } from "../../store/slices/commentSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

type Props = {
  thumbnail: string;
  title: string;
  viewCount: number;
  publishedAt: string;
  description: string;
  channelTitle: string;
  videoId: string;
  type: string;
};
const RecommendedVideoCard = ({
  thumbnail,
  title,
  viewCount,
  publishedAt,
  description,
  channelTitle,
  videoId,
  type,
}: Props) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
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
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleVideoPlay = async () => {
    try {
      const resultAction = await dispatch(fetchSingleVideoData(videoId));

      if (fetchSingleVideoData.fulfilled.match(resultAction)) {
        sessionStorage.setItem(
          "video",
          JSON.stringify(resultAction.payload.items[0])
        );
        dispatch(resetComments());
        debugger;
        navigate(`/watch?v=${videoId}`);
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
  return (
    <div className="grid grid-cols-12" onClick={handleVideoPlay}>
      {/* {type === "recommendedVideo" && <div className="col-span-1">{type}</div>} */}
      <div
        className={`${
          type === "recommendedVideo" ? "col-span-5" : "col-span-3"
        }`}
      >
        <img src={thumbnail} />
      </div>
      <div className="col-span-6 flex flex-col px-2">
        <span className="font-medium text-[#F1F1F1] text-[14px] pb-2 overflow-hidden text-ellipsis max-h-12 leading-6">
          {title}
        </span>
        <span className="text-[12px] text-[#AAAAAA] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
          {channelTitle}
        </span>
        <div className="flex items-center text-[12px] text-[#AAAAAA]">
          <span>{formatNumber(JSON.stringify(viewCount))}</span>
          <Dot />
          <span>{formatDate(publishedAt)}</span>
        </div>
      </div>
      <div
        className="col-span-1"
      >
        <span
          className="w-[max-content] float-right relative z-1"
          ref={buttonRef}
          onClick={handleEllipsis}
        >
          <EllipsisVertical />
          {showOptions && (
            <div
              className={`flex flex-col absolute z-100 bg-[#282828] rounded-lg right-1 w-[max-contenr] ${
                dropdownPosition === "bottom" ? "top-full" : "bottom-full mb-2"
              }`}
              ref={dropdownRef}
            >
              <div className="flex flex-col py-1 cursor-pointer">
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <ListVideo />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">
                    Add to queue
                  </span>
                </div>
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <Clock5 />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">
                    Save to Watch later
                  </span>
                </div>
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <Bookmark />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">
                    Save to playlist
                  </span>
                </div>
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <Share />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">
                    Share
                  </span>
                </div>
                <div className="h-[1px] w-full bg-[#fffaaa] mt-2"></div>
                <div className="flex gap-2 p-2 hover:bg-slate-800">
                  <Flag />
                  <span className="pl-2 whitespace-nowrap text-[#fff] font-medium">
                    Report
                  </span>
                </div>
              </div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};
export default RecommendedVideoCard;
