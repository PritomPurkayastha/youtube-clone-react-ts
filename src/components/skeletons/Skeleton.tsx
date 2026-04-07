const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-300 rounded ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
    </div>
  );
};

export default Skeleton;
