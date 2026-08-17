import { POSTS_PER_PAGE } from "@/lib/constants";

/**
 * Loading state for blog listing page
 * Displays skeleton UI while posts are being fetched
 */
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-96"></div>
      </div>

      {/* Search bar skeleton */}
      <div className="mb-6 animate-pulse">
        <div className="h-12 bg-gray-200 rounded-lg w-full max-w-md"></div>
      </div>

      {/* Posts grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
