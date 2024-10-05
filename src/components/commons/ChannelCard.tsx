import { Thumbnails } from "../../store/slices/searchSlice";
import { formatNumber } from "../../utils/helper";

type Props = {
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  liveBroadcastContent: string;
  channelLogo: Thumbnails;
  subscriberCount: number;
};
const ChannelCard = ({
  channelId,
  channelTitle,
  description,
  publishedAt,
  liveBroadcastContent,
  channelLogo,
  subscriberCount,
}: Props) => {
  return (
    <div className="grid grid-cols-12 items-center h-[max-content] p-4 cursor-pointer">
      <div className="col-span-6 flex justify-center">
        <img
          src={channelLogo.high.url}
          className='h-[136px] w-[136px] rounded-full'
        />
      </div>
      <div className="col-span-5 flex flex-col">
        <span className="font-medium text-[#F1F1F1] text-[18px] pb-2 ">{channelTitle}</span>
        <span className="text-[12px] text-[#AAAAAA] gap-2">{formatNumber(JSON.stringify(subscriberCount))} subscribers</span>
        <span className="text-[12px] text-[#AAAAAA]">{description}</span>
      </div>
      <div className="col-span-1 flex justify-center">
        <button className="rounded-full bg-[#F1F1F1] text-[#0f0f0f] font-medium p-2">Subscribe</button>
      </div>
    </div>
  );
};

export default ChannelCard;
