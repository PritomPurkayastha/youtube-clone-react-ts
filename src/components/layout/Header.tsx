import React, { useState } from "react";
import logo from "../../assets/YouTube-Logo.wine.svg";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { toggleSidebar } from "../../store/slices/homeSlice";

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const showSidebar =  useSelector(
    (state: RootState) => state.category.showSidebar
  );
  return (
    <div>
      <div className="hidden sm:flex justify-between content-center gap-10 lg:gap-20">
        <div className="flex items-center justify-center flex-shrink-0">
          <button className="p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors" onClick={() => dispatch(toggleSidebar(!showSidebar))}>
            <Menu />
          </button>
          <img src={logo} className="h-16 flex-shrink-0" />
        </div>
        <div className="hidden sm:flex items-center justify-center gap-4 flex-shrink-0 sm:w-1/4 md:w-2/4 xl:w-[800px]">
          <div className="flex flex-grow">
            <input
              type="text"
              placeholder="Search"
              className="px-4 rounded-l-full border border-gray-500 w-full outline-none bg-[#0f0f0f]"
            />
            <button className="p-2 px-4 bg-gray-700 rounded-r-full hover:bg-slate-800 ">
              <Search />
            </button>
          </div>
          <button className="p-2 bg-gray-700 rounded-full w-10 h-10 flex content-center hover:bg-slate-800 ">
            <Mic />
          </button>
        </div>
        <div className="flex flex-shrink-0 items-center justify-between gap-3">
          <button
            onClick={() => setShowSearchBar(true)}
            className="sm:hidden p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors"
          >
            <Search />
          </button>
          <button className="sm:hidden p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors">
            <Mic />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors">
            <Upload />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors">
            <Bell />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors">
            <User />
          </button>
        </div>
      </div>
      <div className="sm:hidden flex justify-between content-center gap-10 lg:gap-20">
        <div className={`items-center justify-center flex-shrink-0 ${showSearchBar ? 'hidden' : 'flex'}`}>
          <button className="p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors" onClick={() => dispatch(toggleSidebar(!showSidebar))}>
            <Menu />
          </button>
          <img src={logo} className="h-16 flex-shrink-0" />
        </div>
        <div className={`py-2 items-center justify-center gap-4 flex-shrink-0 w-full ${showSearchBar ? 'flex' : 'hidden'}`}>
          <div className="flex flex-grow max-w-[800px]">
          <button onClick={() => setShowSearchBar(false)} className="py-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors">
            <ArrowLeft />
          </button>
            <input
              type="text"
              placeholder="Search"
              className="px-2 rounded-l-full border border-gray-500 w-full outline-none bg-[#0f0f0f]"
            />
            <button className="p-2 px-4 bg-gray-700 rounded-r-full hover:bg-slate-800 ">
              <Search />
            </button>
          </div>
          <button className="p-2 bg-gray-700 rounded-full w-10 h-10 flex content-center hover:bg-slate-800 ">
            <Mic />
          </button>
        </div>
        <div className={`flex-shrink-0 items-center justify-between gap-3 ${showSearchBar ? 'hidden' : 'flex'}`}>
          <button
            onClick={() => setShowSearchBar(true)}
            className="sm:hidden p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors"
          >
            <Search />
          </button>
          <button className="sm:hidden p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors">
            <Mic />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors">
            <Upload />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors">
            <Bell />
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors">
            <User />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
