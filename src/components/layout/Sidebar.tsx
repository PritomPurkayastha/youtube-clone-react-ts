import FullSidebar from "./FullSidebar";
import CollapsedSidebar from "./CollapsedSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Sidebar = () => {
  const showSidebar = useSelector(
    (state: RootState) => state.category.showSidebar
  );
  const isWatchActive = useSelector(
    (state: RootState) => state.category.isWatchActive
  );
  return (
    <aside className="overflow-y-auto scrollbar-hidden relative">
      {!isWatchActive ? (
        <div className="relative">
          <div className="hidden lg:flex sticky overflow-y-scroll">
            {showSidebar ? <FullSidebar /> : <CollapsedSidebar />}
          </div>
          <div className="flex flex-col items-start lg:hidden">
            {showSidebar ? (
              <div className="hidden md:flex">
                <CollapsedSidebar />
              </div>
            ) : (
              <div className="fixed inset-y-0 left-0 top-16 transform translate-x-0 md:translate-x-0 transition-transform duration-800 ease-in-out z-40 bg-[#0f0f0f] pl-4 overflow-y-auto">
                <FullSidebar />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed inset-y-0 left-0 top-16 transform translate-x-0 md:translate-x-0 transition-transform duration-800 ease-in-out z-40 bg-[#0f0f0f] pl-4 overflow-y-auto">
          {!showSidebar && <FullSidebar />}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
