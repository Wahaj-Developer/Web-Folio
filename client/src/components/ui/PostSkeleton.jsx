const PostSkeleton = () => {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-video bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
