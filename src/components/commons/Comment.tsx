import { useEffect, useRef, useState } from "react";
import { formatDate, formatNumber } from "../../utils/helper";
import {
  ChevronDown,
  EllipsisVertical,
  Flag,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchCommentReplies, Replies } from "../../store/slices/commentSlice";

type Props = {
  profileImage: string;
  authorName: string;
  channelId?: string;
  likeCount: number;
  publishedAt: string;
  updatedAt?: string;
  totalReplyCount?: number;
  isPublic?: boolean;
  authorChannelId?: string;
  comment: string;
  commentId: string;
  replies?: Replies[];
};

const Comment = ({
  profileImage,
  authorName,
  likeCount,
  publishedAt,
  updatedAt,
  totalReplyCount,
  comment,
  commentId,
  replies,
}: Props) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [showReportPopUp, setShowReportPopUp] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const getReplies = () => {
    if (!showReplies) {
      dispatch(fetchCommentReplies(commentId));
    }
    setShowReplies(!showReplies);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowReportPopUp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
    setShowReportPopUp(!showReportPopUp);
  };
  return (
    <div className="grid w-full grid-cols-12">
      <img
        src={profileImage}
        className="col-span-1 rounded-full h-10 w-10 bg-opacity-50 p-1 mr-4"
      />
      <div className="flex flex-col items-start col-span-11">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span
              className={`max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap font-medium font-sans`}
            >
              {authorName}
            </span>
            <span className="font-normal text-sm text-[#AAAAAA]">
              {formatDate(updatedAt ? updatedAt : publishedAt)}
            </span>
          </div>
          <div className="relative" ref={buttonRef} onClick={handleEllipsis}>
            <EllipsisVertical />
            {showReportPopUp && (
              <div
                className={`flex flex-col p-2 absolute z-100 bg-[#282828] rounded-lg ${
                  dropdownPosition === "bottom"
                    ? "left-0 top-full"
                    : "left-0 bottom-full mb-2"
                }`}
                ref={dropdownRef}
              >
                <div className="flex py-1 px-2 hover:bg-slate-800 cursor-pointer">
                  <Flag />
                  <span className="pl-2">Report</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-[max-content] pr-10 whitespace-pre-wrap relative">
          {comment}
        </div>
        <div className="flex items-center gap-3 py-2">
          <div className="flex items-center font-thin gap-2">
            <ThumbsUp className="font-thin text-[5px]" />
            <span>{formatNumber(likeCount.toString())}</span>
          </div>
          <ThumbsDown />
          <span className="text-sm font-medium text-[#FFFFFF]">Reply</span>
        </div>
        {totalReplyCount !== undefined && totalReplyCount > 0 && (
          <div
            className="text-[#3ea6ff] text-lg flex items-center justify-center text-[15px] font-medium cursor-pointer"
            onClick={getReplies}
          >
            <ChevronDown />
            {totalReplyCount} reply
          </div>
        )}
        {showReplies &&
          replies &&
          replies.map((reply: Replies) => (
            <div className="flex flex-col w-full py-2">
              <Comment
                authorName={reply.snippet.authorDisplayName}
                profileImage={reply.snippet.authorProfileImageUrl}
                channelId={reply.snippet.channelId}
                likeCount={reply.snippet.likeCount}
                publishedAt={reply.snippet.publishedAt}
                updatedAt={reply.snippet.updatedAt}
                authorChannelId={reply.snippet.authorChannelId.value}
                comment={reply.snippet.textOriginal}
                commentId={reply.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
