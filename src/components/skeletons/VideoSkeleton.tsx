import Skeleton from "./Skeleton.tsx";

const VideoSkeleton = () => {
  return (
    <div className="w-full">
      {/* Thumbnail */}
      <Skeleton className="w-full h-40 mb-3 rounded-xl" />

      <div className="flex gap-3">
        {/* Channel avatar */}
        <Skeleton className="w-10 h-10 rounded-full" />

        <div className="flex flex-col w-full gap-2">
          {/* Title line */}
          <Skeleton className="h-4 w-3/4" />

          {/* Second line */}
          <Skeleton className="h-4 w-1/2" />

          {/* Small line */}
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default VideoSkeleton;
