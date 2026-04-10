export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 rounded-2xl mb-4" />
      <div className="h-4 bg-gray-200 rounded-full mb-2 w-3/4" />
      <div className="h-5 bg-gray-200 rounded-full w-1/3" />
    </div>
  )
}

export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
