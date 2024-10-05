import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSearchResult } from "../../store/slices/searchSlice";
import { format, subHours, startOfDay, startOfWeek, startOfMonth, startOfYear } from 'date-fns';

interface ChildProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const FilterModal = ({setShowModal}: ChildProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [filterData, setFilterData] = useState<any>([]);
  const inputValue = useSelector(
    (state: RootState) => state.search.searchQuery
  );
  useEffect(() => {
    const filterOptions: any = [
      {
        category: "UPLOAD DATE",
        options: [
          {
            label: "Last hour",
            selected: false,
            disabled: false
          },
          {
            label: "Today",
            selected: false,
            disabled: false
          },
          {
            label: "This week",
            selected: false,
            disabled: false
          },
          {
            label: "This month",
            selected: false,
            disabled: false
          },
          {
            label: "This year",
            selected: false,
            disabled: false
          },
        ],
      },
      {
        category: "TYPE",
        options: [
          {
            label: "Video",
            selected: false,
            disabled: false
          },
          {
            label: "Channel",
            selected: false,
            disabled: false
          },
          {
            label: "Playlist",
            selected: false,
            disabled: false
          },
          {
            label: "Movie",
            selected: false,
            disabled: false
          },
        ],
      },
      {
        category: "DURATION",
        options: [
          {
            label: "Under 4 minutes",
            selected: false,
            disabled: false
          },
          {
            label: "4-20 minutes",
            selected: false,
            disabled: false
          },
          {
            label: "Over 20 minutes",
            selected: false,
            disabled: false
          },
        ],
      },
      {
        category: "FEATURES",
        options: [
          {
            label: "Live",
            selected: false,
            disabled: false
          },
          {
            label: "4k",
            selected: false,
            disabled: false
          },
          {
            label: "HD",
            selected: false,
            disabled: false
          },
          {
            label: "Subtitles/CC",
            selected: false,
            disabled: false
          },
          {
            label: "Creative Commons",
            selected: false,
            disabled: false
          },
          {
            label: "360°",
            selected: false,
            disabled: false
          },
          {
            label: "VR180",
            selected: false,
            disabled: false
          },
          {
            label: "3D",
            selected: false,
            disabled: false
          },
          {
            label: "HDR",
            selected: false,
            disabled: false
          },
          {
            label: "Location",
            selected: false,
            disabled: false
          },
          {
            label: "Purchased",
            selected: false,
            disabled: false
          },
        ],
      },
      {
        category: "SORT BY",
        options: [
          {
            label: "Relevance",
            selected: true,
            disabled: false
          },
          {
            label: "Upload date",
            selected: false,
            disabled: false
          },
          {
            label: "View Count",
            selected: false,
            disabled: false
          },
          {
            label: "Rating",
            selected: false,
            disabled: false
          },
        ],
      },
    ];
    setFilterData(filterOptions);
  }, []);

  const filterVideo = (category: string, option: string, value: boolean) => {
    const data = [...filterData];
    data.map((filter: any) => {
      if(filter.category === category) {
        filter.options.map((filterOption: any) => {
          if(filterOption.label === option) {
            filterOption.selected = !filterOption.selected;
          } else if(category !== 'FEATURES') {
            filterOption.selected = false;
          }
        });
      }
    });
    setFilterData(data);
    const apiKey = import.meta.env.VITE_API_KEY;
    const params: any = {
      key: apiKey,
      part: 'snippet',
      q: inputValue,
      maxResults: 20
    }
    if(category === 'SORT BY') {
      params.order = 'relevance';
      if(option === 'Upload date' && value) {
        params.order = 'date';
      } else if (option === 'View Count' && value) {
        params.order = 'viewCount';
      } else if (option === 'Rating' && value) {
        params.order = 'rating';
      }
    } 
    if(category === 'TYPE') {
      params.type = 'video';
      if(option === 'Channel' && value) {
        params.type = 'channel';
      } else if (option === 'Playlist' && value) {
        params.type = 'playlist';
      } else if (option === 'Movie' && value) {
        params.videoType = 'movie';
      }
    }
    if(category === 'DURATION') {
      params.videoDuration = 'any';
      if(option === 'Under 4 minutes' && value) {
        params.videoDuration = 'short';
      } else if (option === '4-20 minutes' && value) {
        params.videoDuration = 'medium';
      } else if (option === '4-20 minutes' && value) {
        params.videoDuration = 'Over 20 minutes';
      }
    }
    if(category === 'FEATURES') {
      if(option === 'HD' && value) {
        params.videoDefinition = 'high';
      }
      if(option === '3D' && value) {
        params.videoDimension = '3d';
      }
      if(option === 'Creative Commons' && value) {
        params.videoLicense = 'creativeCommon';
      }
      if(option === 'Live' && value) {
        params.eventType = 'live';
      }
    }
    if(category === 'UPLOAD DATE') {
      if(option === 'Last hour' && value) {
        params.publishedBefore = format(subHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss'Z'");
      }
    }
    setShowModal(false);
    dispatch(fetchSearchResult(params));
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-[#212121] rounded-lg shadow-xl w-3/5 p-4">
        <div className="flex justify-between mb-4 text-lg text-[#F1F1F1] font-medium">
          <div>Search filters</div>
          <button className="text-[30px]" onClick={() => setShowModal(false)}>&times;</button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {filterData.map((filter: any, index: number) => (
            <div className="flex flex-col" key={index}>
              <span className="text-[#fff] font-medium pb-2 border-b-2 border-b-[#FFFFFF33]">
                {filter.category}
              </span>
              <div className="flex flex-col items-start filter-options pt-2">
                {filter.options.map((option: any) => (
                  <button
                    className={`text-[#aaa] mb-2 cursor-pointer ${option.selected && 'text-[#fff]'} whitespace-nowrap`}
                    key={option.label}
                    onClick={() => filterVideo(filter.category, option.label, !option.selected)}
                  >
                    {option.label}
                    {option.selected && filter.category !== 'SORT BY' &&
                      <button className="text-[#fff] pl-2 text-xl">&times;</button>
                    }
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
