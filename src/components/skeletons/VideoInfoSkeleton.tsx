import Skeleton from "./Skeleton";

const VideoInfoSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2 py-2">
      {/* Big line skeleton */}
      <Skeleton className="h-6 w-3/4" />
      {/* Small line skeleton */}
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

export default VideoInfoSkeleton;

