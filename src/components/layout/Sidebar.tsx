import {
  BookCheck,
  CirclePlay,
  Clapperboard,
  Clock5,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  Link,
  ListVideo,
  MonitorPlay,
  Music2,
  Newspaper,
  Radio,
  RadioTower,
  Repeat,
  Shirt,
  ShoppingBag,
  ThumbsUp,
  Trophy,
  UserPen,
  Youtube,
} from "lucide-react";
import React, { ElementType } from "react";

const Sidebar = ({className}: any) => {
  type entries = {
    icon: ElementType,
    text: string
  }
  type sideBarType = {
    category: string | null
    entries: entries[]
  }
  const sideBar: sideBarType[] = [
    {
      category: null,
      entries: [
        {
          icon: Home,
          text: "Home",
        },
        {
          icon: Link,
          text: "Shorts",
        },
        {
          icon: Library,
          text: "Subscription",
        },
      ],
    },
    {
      category: "You",
      entries: [
        {
          icon: UserPen,
          text: "Your Channel",
        },
        {
          icon: History,
          text: "History",
        },
        {
          icon: ListVideo,
          text: "Playlists",
        },
        {
          icon: MonitorPlay,
          text: "Your Videos",
        },
        {
          icon: Clock5,
          text: "Watch Later",
        },
        {
          icon: ThumbsUp,
          text: "Liked Videos",
        },
      ],
    },
    {
      category: "Explore",
      entries: [
        {
          icon: Flame,
          text: "Trending",
        },
        {
          icon: ShoppingBag,
          text: "Shopping",
        },
        {
          icon: Music2,
          text: "Music",
        },
        {
          icon: Clapperboard,
          text: "Films",
        },
        {
          icon: Radio,
          text: "Live",
        },
        {
          icon: Gamepad2,
          text: "Games",
        },
        {
          icon: Newspaper,
          text: "News",
        },
        {
          icon: Trophy,
          text: "Sport",
        },
        {
          icon: Lightbulb,
          text: "Courses",
        },
        {
          icon: Shirt,
          text: "Fashion & beauty",
        },
        {
          icon: RadioTower,
          text: "Podcasts",
        },
      ],
    },
    {
      category: "More From Youtube",
      entries: [
        {
          icon: Youtube,
          text: "Youtube",
        },
        {
          icon: BookCheck,
          text: "Youtube Studio",
        },
        {
          icon: CirclePlay,
          text: "Youtube Music",
        },
        {
          icon: Youtube,
          text: "Youtube Kids",
        },
      ],
    },
  ];
  return (
    <aside className="flex flex-col items-start overflow-y-auto scrollbar-hidden w-30 relative z-10">
      {
        sideBar.map((category: sideBarType) => (
          <div className={`flex flex-col items-start overflow-y-auto scrollbar-hidden w-30 relative ${className}`}>
            {category.category &&
              <span className="font-sans text-xl text-white w-full border-t border-t-orange-500 py-4 mt-4">{ category.category }</span>
            }
            {
              category.entries.map((item: entries) => (
                <div className="flex items-center py-2">
                  <item.icon/>
                  <span className="pl-2 text-sm font-sans font-normal">{item.text}</span>
                </div>
              ))
            }
          </div>
        ))
      }
    </aside>
  );
};

export default Sidebar;
