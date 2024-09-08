import React, { useState } from "react";
import { formatDate, formatNumber } from "../../utils/helper";
import { ArrowDown, ChevronDown, EllipsisVertical, ThumbsDown, ThumbsUp } from "lucide-react";

type Props = {
  profileImage: string;
  authorName: string;
  channelId?: string;
  likeCount: number;
  publishedAt: string;
  updatedAt?: string;
  totalReplyCount?: number;
  isPublic: boolean;
  authorChannelId: string;
  comment: string;
};

const Comment = ({
  profileImage,
  authorName,
  channelId,
  likeCount,
  publishedAt,
  updatedAt,
  totalReplyCount,
  isPublic,
  authorChannelId,
  comment,
}: Props) => {
  const [showFullComment, setShowFullComment] = useState<boolean>(false);
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
          <EllipsisVertical />
        </div>
        {!showFullComment ? (
          <div className="max-h-[200px] pr-10 text-ellipsis overflow-hidden whitespace-pre-wrap relative font-medium">
            {comment}
          </div>
        ) : (
          <div className="h-[max-content] pr-10 whitespace-pre-wrap relative">
            {comment}
          </div>
        )}
        <div className="flex items-center gap-3 py-2">
          <div className="flex items-center font-thin gap-2">
            <ThumbsUp className="font-thin text-[5px]"/>
            <span>{formatNumber(likeCount.toString())}</span>
          </div>
          <ThumbsDown />
          <span className="text-sm font-medium text-[#FFFFFF]">Reply</span>
        </div>
        {
          totalReplyCount !== undefined && totalReplyCount > 0 &&
          <div className="text-[#3ea6ff] text-lg flex items-center justify-center text-[15px] font-medium cursor-pointer">
            <ChevronDown />
            {totalReplyCount} reply
          </div>
        }
      </div>
    </div>
  );
};

export default Comment;
