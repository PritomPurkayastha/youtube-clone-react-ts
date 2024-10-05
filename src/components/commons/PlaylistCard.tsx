import { PlayIcon } from "lucide-react";
import * as React from "react";

type Props = {
  thumbnail: string;
  title: string;
  publishedAt: string;
  description: string;
  channelTitle: string;
  playListId: string
};
const PlaylistCard = ({thumbnail, title, publishedAt, description, channelTitle, playListId}: Props) => {
  const [showPlayButton, setShowPlayButton] = React.useState<boolean>(false);
  const handleVideoPlay = (playListId: string) => {
    console.log(playListId, publishedAt);
  }
  const handleShowPlayList = (event: any) => {
    event.stopPropagation();
    
  }
  return (
    <div
      className="grid grid-cols-12 h-[max-content] p-4 cursor-pointer"
      onClick={() => handleVideoPlay(playListId)}
    >
      <div className="col-span-6 h-[300px] relative">
        <img src={thumbnail} className="h-full w-full rounded-md hover:opacity-10" onMouseOver={() => setShowPlayButton(true)} onMouseOut={() => setShowPlayButton(false)}/>
        <span className={`absolute top-1/2 left-1/2 z-10 ${showPlayButton ? 'flex' : 'hidden'} text-[#fff] font-medium`}>
          <PlayIcon/>
          PLAY ALL
        </span>
      </div>
      <div className="col-span-5 flex flex-col pl-4">
        <span className="font-medium text-[#F1F1F1] text-[18px] pb-2 overflow-hidden text-ellipsis max-h-12 leading-6">
          {title}
        </span>
        <div className="flex items-center gap-2 pb-4">
          <span className="text-[12px] text-[#AAAAAA] gap-2">
            {channelTitle}
          </span>
          <span className="text-[12px] text-[#AAAAAA]">.</span>
          <span className="text-[12px] text-[#AAAAAA] gap-2">
            Playlist
          </span>
        </div>
        <span className="text-[12px] text-[#AAAAAA] font-medium font-serif overflow-hidden text-ellipsis max-h-12 leading-6">
          {description}
        </span>
        <span className="text-[#AAAAAA] text-[12px] font-medium hover:text-[#fff]" onClick={handleShowPlayList}>VIEW FULL PLAYLIST</span>
      </div>
    </div>
  )
};

export default PlaylistCard;
