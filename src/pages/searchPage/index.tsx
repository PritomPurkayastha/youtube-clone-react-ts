import { SlidersHorizontal } from "lucide-react";
import Categories from "../HomePage/Categories";
import { useSelector } from "react-redux";
import { YouTubeSearchResult } from "../../store/slices/searchSlice";
import { AppDispatch, RootState } from "../../store/store";
import ChannelCard from "../../components/commons/ChannelCard";
import VideoInfoCard from "../../components/commons/VideoInfoCard";
import { useState } from "react";
import FilterModal from "./FilterModal";
import PlaylistCard from "../../components/commons/PlaylistCard";

const SearchPage = () => {
  const searchResult: YouTubeSearchResult[] = useSelector(
    (state: RootState) => state.search.searchResult
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-11">
          <Categories />
        </div>
        <div className="flex items-center justify-center col-span-1 gap-2 rounded-full hover:bg-slate-800 p-2" onClick={() => setShowModal(true)}>
          <span className="text-[#FFF] font-medium">Filter</span>
          <SlidersHorizontal />
        </div>
        {
          showModal &&
          <FilterModal setShowModal={setShowModal}/>
        }
      </div>
      {searchResult && (
        <div className="flex flex-col">
          {searchResult.map((result: YouTubeSearchResult) => (
            <div>
              {result.id.kind === "youtube#channel" ? (
                <ChannelCard 
                  channelId={result.snippet.channelId}
                  channelTitle={result.snippet.channelTitle}
                  description={result.snippet.description}
                  publishedAt={result.snippet.publishedAt}
                  liveBroadcastContent={result.snippet.liveBroadcastContent}
                  channelLogo={result.snippet.thumbnails}
                  subscriberCount={Math.floor(Math.random() * (10000000 - 1 + 1)) + 1}
                />
              ) : result.id.kind === "youtube#video" ? (
                <VideoInfoCard 
                  thumbnail={result.snippet.thumbnails.medium.url}
                  title={result.snippet.title}
                  viewCount={Math.floor(Math.random() * (10000000 - 1 + 1)) + 1}
                  publishedAt={result.snippet.publishedAt}
                  description={result.snippet.description}
                  channelTitle={result.snippet.channelTitle}
                  videoId={result.id.videoId ? result.id.videoId : ''}
                />
              ) : 
              <PlaylistCard
                thumbnail={result.snippet.thumbnails.medium.url}
                title={result.snippet.title}
                publishedAt={result.snippet.publishedAt}
                description={result.snippet.description}
                channelTitle={result.snippet.channelTitle}
                playListId={result.id.playlistId ? result.id.playlistId : '' }
              />
            }
            </div> 
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
