import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { YouTubeVideo } from "../../store/slices/videoSlice";
import avatar from "../../assets/avatar-default-symbolic-svgrepo-com.svg";
import {
  ArrowDownToLine,
  Bookmark,
  CircleDollarSign,
  Ellipsis,
  EllipsisVertical,
  Flag,
  Forward,
  Scissors,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { formatDate, formatNumber } from "../../utils/helper";

const video = () => {
  type videoType = YouTubeVideo | null;
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [currentVideo, setCurrentVideo] = useState<videoType>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  useEffect(() => {
    const video = sessionStorage.getItem("video");
    if (video) {
      setCurrentVideo(JSON.parse(video));
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hanldeEcllipsis = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow > 200) {
        setDropdownPosition("bottom");
      } else if (spaceAbove > 200) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
    setIsDropdownVisible(!isDropdownVisible);
  };
  return (
    <div className="w-full h-full">
      <ReactPlayer
        className="video rounded-md py-2"
        url={`https://www.youtube.com/embed/${currentVideo?.id}`}
        playing={false}
        width="100%"
        height="70vh"
        controls
      />
      <div className="w-full flex flex-col">
        <span className="py-2 text-[#fff] font-bold text-xl">
          {currentVideo?.snippet.title}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-12 w-full py-2 gap-4">
          <div className="col-span-1 md:col-span-4 flex items-start md:items-center justify-start gap-10">
            <div className="flex items-center justify-between gap-2">
              <img
                src={avatar}
                className="rounded-full h-8 bg-gray-500 bg-opacity-50 p-1"
              />
              <div className="flex flex-col px-2">
                <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {currentVideo?.snippet.channelTitle}
                </span>
                <span className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                  6.5M subscribers
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="rounded-full py-2 px-4 bg-slate-800">Join</div>
              <div className="rounded-full py-2 px-4 bg-[#fff] text-black">
                Subscribe
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-8 flex items-center md:justify-end gap-2 relative">
            <div className="rounded-full py-2 px-4 bg-slate-800 w-[max-content] flex items-center">
              <div className="flex pr-4 cursor-pointer">
                <ThumbsUp />
                <span className="">
                  {currentVideo &&
                    formatNumber(currentVideo?.statistics.likeCount)}
                </span>
              </div>
              <div className="flex border-l-2 pl-2 cursor-pointer">
                <ThumbsDown />
              </div>
            </div>
            <div className="rounded-full py-2 px-4 bg-slate-800 flex cursor-pointer">
              <Forward />
              <span className="pl-2">Share</span>
            </div>
            <div className="hidden 2xl:flex rounded-full py-2 px-4 bg-slate-800 cursor-pointer">
              <ArrowDownToLine />
              <span className="pl-2">Download</span>
            </div>
            <div className="hidden 2xl:flex rounded-full py-2 px-4 bg-slate-800 cursor-pointer">
              <CircleDollarSign />
              <span className="pl-2">Thanks</span>
            </div>
            <div className="hidden 2xl:flex rounded-full py-2 px-4 bg-slate-800 cursor-pointer">
              <Scissors />
              <span className="pl-2">Clip</span>
            </div>
            <div
              className="rounded-full p-2 bg-slate-800 cursor-pointer relative"
              ref={buttonRef}
              onClick={hanldeEcllipsis}
            >
              <Ellipsis />
              {isDropdownVisible && (
                <div
                  className={`flex flex-col p-2 absolute z-100 bg-[#282828] rounded-lg ${
                    dropdownPosition === "bottom"
                      ? "left-0 top-full"
                      : "left-0 bottom-full mb-2"
                  }`}
                  ref={dropdownRef}
                >
                  <div className="flex 2xl:hidden py-2 px-4 hover:bg-slate-800 cursor-pointer">
                    <ArrowDownToLine />
                    <span className="pl-2">Download</span>
                  </div>
                  <div className="flex 2xl:hidden py-2 px-4 hover:bg-slate-800 cursor-pointer">
                    <CircleDollarSign />
                    <span className="pl-2">Thanks</span>
                  </div>
                  <div className="flex 2xl:hidden py-2 px-4 hover:bg-slate-800 cursor-pointer">
                    <Scissors />
                    <span className="pl-2">Clip</span>
                  </div>
                  <div className="flex py-2 px-4 hover:bg-slate-800 cursor-pointer">
                    <Bookmark />
                    <span className="pl-2">Save</span>
                  </div>
                  <div className="flex py-2 px-4 hover:bg-slate-800 cursor-pointer">
                    <Flag />
                    <span className="pl-2">Report</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default video;
