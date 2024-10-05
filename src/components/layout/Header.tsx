import React, { useEffect, useState } from "react";
import logo from "../../assets/YouTube-Logo.wine.svg";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setIsWatchActive, toggleSidebar } from "../../store/slices/homeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSearchResult, setSearchQuery } from "../../store/slices/searchSlice";
import { fetchVideoList } from "../../store/slices/videoSlice";

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const showSidebar =  useSelector(
    (state: RootState) => state.category.showSidebar
  );
  const inputValue = useSelector(
    (state: RootState) => state.search.searchQuery
  );
  const category = useSelector(
    (state: RootState) => state.category.selectedCategoryId
  );

  useEffect(() => {
    if (location.pathname === '/watch') {
      dispatch(setIsWatchActive(true));
    } else {
      dispatch(setIsWatchActive(false));
    }
  }, [location]);
  
  const handleSearchVideo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/results?search_query=${inputValue}`);
    const apiKey = import.meta.env.VITE_API_KEY;
    const params = {
      key: apiKey,
      part: 'snippet',
      q: inputValue,
      maxResults: 20
    }
    dispatch(fetchSearchResult(params));
  }

  const handleRefresh = () => {
    dispatch(fetchVideoList(category));
    navigate(`/`);
  }
  return (
    <div>
      <div className="hidden sm:flex justify-between content-center gap-10 lg:gap-20 pl-2">
        <div className="flex items-center justify-center flex-shrink-0">
          <button className="p-2 hover:bg-slate-800 rounded-full w-10 h-10 flex content-center transition-colors" onClick={() => dispatch(toggleSidebar(!showSidebar))}>
            <Menu />
          </button>
          <img src={logo} className="h-16 flex-shrink-0" onClick={handleRefresh}/>
        </div>
        <div className="hidden sm:flex items-center justify-center gap-4 flex-shrink-0 sm:w-1/4 md:w-2/4 xl:w-[800px]">
          <form className="flex flex-grow" onSubmit={handleSearchVideo}>
            <input
              type="text"
              placeholder="Search"
              className="px-4 rounded-l-full border border-gray-500 w-full outline-none bg-[#0f0f0f]"
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
            <button className="p-2 px-4 bg-gray-700 rounded-r-full hover:bg-slate-800 ">
              <Search />
            </button>
          </form>
          <button className="p-2 bg-gray-700 rounded-full w-10 h-10 flex content-center hover:bg-slate-800" type="submit">
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
