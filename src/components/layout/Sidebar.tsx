import {
  BookCheck,
  BookCopy,
  CirclePlay,
  Clapperboard,
  Clock5,
  Flame,
  Gamepad2,
  History,
  Home,
  HomeIcon,
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
import FullSidebar from "./FullSidebar";
import CollapsedSidebar from "./CollapsedSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Sidebar = () => {
  const showSidebar = useSelector(
    (state: RootState) => state.category.showSidebar
  );
  return (
    <aside className="overflow-y-auto scrollbar-hidden relative">
      <div className="hidden lg:flex">
        {showSidebar ? <FullSidebar /> : <CollapsedSidebar />}
      </div>
      <div className="flex flex-col lg:hidden">
        {showSidebar === true ? "abc" : 'cba'}
        {showSidebar ?
          <div className="hidden md:flex">
            <CollapsedSidebar />
          </div>
        : 
          <div
            className="fixed inset-y-0 left-0 top-16 transform translate-x-0 md:translate-x-0 transition-transform duration-800 ease-in-out z-40 bg-[#0f0f0f] pl-4 overflow-y-auto"
          >
            hjasebfjsehbf
            <FullSidebar />
          </div>
        }
      </div>
    </aside>
  );
};

export default Sidebar;
