import { Skeleton } from "@/components/ui/skeleton";

export const Shimmer = () => {
  return (
    <div className="container mx-auto px-8 py-8">
      <div className="space-y-8">
        {[...Array(3)].map((_, index) => (
          <article key={index} className="animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex items-center gap-2 text-sm">
                <Skeleton className="h-4 w-24" />
                <span>·</span>
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-4" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <Skeleton className="h-4 w-16" />

                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
