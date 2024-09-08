import React, { useEffect, useRef, useState } from "react";
import { YouTubeVideo } from "../../store/slices/videoSlice";
import { formatNumber } from "../../utils/helper";
import { AlignLeft, Smile } from "lucide-react";
import avatar from "../../assets/avatar-default-symbolic-svgrepo-com.svg";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  CommentThread,
  fetchTopLevelComments,
} from "../../store/slices/commentSlice";
import Comment from "../../components/commons/Comment";

const Comments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const commentList: CommentThread[] = useSelector(
    (state: RootState) => state.comment.comments
  );
  const nextPageToken = useSelector(
    (state: RootState) => state.comment.nextPageToken
  );

  type videoType = YouTubeVideo | null;
  const [currentVideo, setCurrentVideo] = useState<videoType>(null);
  const [comment, setComment] = useState<string>("");
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showEmojiPicker, setshowEmojiPicker] = useState<boolean>(false);
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLDivElement>(null);
  const sortButtonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = sessionStorage.getItem("video");
    if (video) {
      setCurrentVideo(JSON.parse(video));
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setshowEmojiPicker(false);
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    if (currentVideo) {
      dispatch(fetchTopLevelComments({ videoId: currentVideo.id }));
    }
  }, [currentVideo]);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to recalculate the new height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the new height
    }
  };

  const toggleEmojiPicker = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setValue((prev) => prev + emojiData.emoji);
  };
  const hanldeEcllipsis = () => {
    if (sortButtonRef.current) {
      const buttonRect = sortButtonRef.current.getBoundingClientRect();
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
    setShowSortOptions(!showSortOptions);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-6">
        <span className="text-[#fff] font-bold">
          {currentVideo && formatNumber(currentVideo.statistics.commentCount)}{" "}
          Comments
        </span>
        <div
          className="flex gap-2 relative"
          onClick={() => setShowSortOptions(!showSortOptions)}
          ref={sortButtonRef}
        >
          <AlignLeft />
          Sort by
          {showSortOptions && (
            <div
              className={`flex flex-col p-2 absolute z-100000 bg-[#282828] rounded-lg w-[max-conetent] ${
                dropdownPosition === "bottom"
                  ? "left-0 top-full"
                  : "left-0 bottom-full mb-2"
              }`}
              ref={dropdownRef}
            >
              <div className="flex 2xl:hidden py-2 px-4 hover:bg-slate-800 cursor-pointer">
                <span className="pl-2 whitespace-nowrap">Top Comments</span>
              </div>
              <div className="flex 2xl:hidden py-2 px-4 hover:bg-slate-800 cursor-pointer">
                <span className="pl-2">Newest First</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start py-4">
        <img
          src={avatar}
          className="rounded-full h-8 bg-gray-500 bg-opacity-50 p-1 mr-4"
        />
        <div className="flex flex-col w-full relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="w-full p-2 focus:outline-none focus:border-b-[#fff] resize-none overflow-hidden bg-transparent focus:border-b-2"
            style={{
              // borderBottom: '1px solid red',
              transition: "border-bottom-color 0.3s ease",
            }}
            onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
            rows={1}
            placeholder="Add a comment..."
          />
          {isFocused && (
            <div className="flex justify-between items-center py-2">
              <div className="relative">
                <div
                  className="max-w-[max-content]"
                  ref={emojiButtonRef}
                  onClick={toggleEmojiPicker}
                >
                  <Smile />
                </div>
                {showEmojiPicker && (
                  <div ref={emojiPickerRef} className="absolute mt-2 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-white-opacity-20 text-[#f1f1f1] bg-transparent">
                  Cancel
                </button>
                <button className="rounded-full bg-[#3ea6ff] p-2 text-black text-md font-medium">
                  Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {commentList.map((comment: CommentThread) => (
        <div className="flex flex-col w-full py-2">
          <Comment
            authorName={comment.snippet.topLevelComment.snippet.authorDisplayName}
            profileImage={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
            channelId={currentVideo?.snippet.channelId}
            likeCount={comment.snippet.topLevelComment.snippet.likeCount}
            publishedAt={comment.snippet.topLevelComment.snippet.publishedAt}
            updatedAt={comment.snippet.topLevelComment.snippet.updatedAt}
            isPublic={comment.snippet.isPublic}
            authorChannelId={comment.snippet.topLevelComment.snippet.authorChannelId.value}
            comment={comment.snippet.topLevelComment.snippet.textOriginal}
            totalReplyCount={comment.snippet.totalReplyCount}
          />
        </div>
      ))}
    </div>
  );
};

export default Comments;
