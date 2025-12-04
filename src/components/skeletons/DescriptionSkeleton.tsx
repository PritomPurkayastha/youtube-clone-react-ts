import Skeleton from "./Skeleton";

const DescriptionSkeleton = () => {
  return (
    <div className="rounded-md bg-[#FFFFFF1A] max-h-[max-content] p-4 flex flex-col items-start my-4 w-full">
      <div className="flex flex-col gap-2 w-full">
        {/* First line - views and date */}
        <Skeleton className="h-4 w-48" />
        
        {/* Second line - description line 1 */}
        <Skeleton className="h-4 w-full" />
        
        {/* Third line - description line 2 */}
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export default DescriptionSkeleton;

