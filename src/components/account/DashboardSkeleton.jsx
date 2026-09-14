// Skeleton loading states for the dashboard overview
// Shown while data is being fetched from the API

// Single block skeleton element
function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`bg-[#E9E3D8] animate-pulse ${className}`}
      aria-hidden="true"
    />
  )
}

// Stat card skeleton (used in overview 3-up stats row)
export function StatCardSkeleton() {
  return (
    <div className="border border-[#E5E5E5] p-6">
      <SkeletonBlock className="h-3 w-16 mb-4" />
      <SkeletonBlock className="h-8 w-10" />
    </div>
  )
}

// Single order row skeleton
export function OrderRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-5 border-b border-[#F0ECE6] gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <SkeletonBlock className="h-14 w-14 flex-shrink-0" />
        <div className="flex-1 space-y-2 min-w-0">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-3 w-40" />
          <SkeletonBlock className="h-3 w-16" />
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <SkeletonBlock className="h-5 w-16" />
        <SkeletonBlock className="h-8 w-24" />
      </div>
    </div>
  )
}

// Welcome heading skeleton
export function WelcomeSkeleton() {
  return (
    <div className="space-y-2 mb-10">
      <SkeletonBlock className="h-7 w-56" />
      <SkeletonBlock className="h-4 w-80" />
    </div>
  )
}

// Wishlist card skeleton
export function WishlistCardSkeleton() {
  return (
    <div className="border border-[#E5E5E5]">
      <SkeletonBlock className="aspect-[3/4] w-full" />
      <div className="p-3 space-y-2">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-3 w-16" />
      </div>
    </div>
  )
}

// Address card skeleton
export function AddressCardSkeleton() {
  return (
    <div className="border border-[#E5E5E5] bg-white p-5 space-y-3">
      <SkeletonBlock className="h-3 w-14" />
      <SkeletonBlock className="h-4 w-32" />
      <SkeletonBlock className="h-3.5 w-48" />
      <SkeletonBlock className="h-3.5 w-36" />
      <div className="pt-3 border-t border-[#F0ECE6] flex gap-4">
        <SkeletonBlock className="h-3 w-12" />
        <SkeletonBlock className="h-3 w-12" />
      </div>
    </div>
  )
}
