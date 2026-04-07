import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./Categories";
import HomeVideos from "./HomeVideos";
import { AppDispatch, RootState } from "../../store/store";
import VideoSkeleton from "../../components/skeletons/VideoSkeleton";
import { fetchVideoList } from "../../store/slices/videoSlice";
import Skeleton from "../../components/skeletons/Skeleton";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.video.isVideoListLoading);
  const category = useSelector(
    (state: RootState) => state.category.selectedCategoryId
  );
  const lastFetchedCategory = useRef<string | null>(null);

  useEffect(() => {
    // Only fetch if category changed
    if (category !== lastFetchedCategory.current) {
      lastFetchedCategory.current = category;
      dispatch(fetchVideoList(category));
    }
  }, [dispatch, category]);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex flex-col">
          <Skeleton className="w-full h-8 rounded-xl mx-4" />
          <div
            className="grid gap-4 p-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {Array.from({ length: 25 }).map((_, index) => (
              <VideoSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Categories />
          <HomeVideos />
        </>
      )}
    </div>
  );
};

export default HomePage;
