import { Skeleton } from "@chakra-ui/react";

export function ListingsGridSkeleton() {
  const loadingListings = [...Array(30).keys()];
  return (
    <main className="grid px-4 pb-4 pt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:overflow-y-scroll lg:max-h-[calc(100vh-250px)] -z-10">
      {loadingListings.map((index) => {
        return <ListingCardSkeleton key={index}></ListingCardSkeleton>;
      })}
    </main>
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="flex flex-col shadow border-solid border-2 border-slate-300 aspect-square rounded-3xl p-4 justify-between overflow-y-auto hover:scale-105 transition-all -z-10">
      <Skeleton height="20px"></Skeleton>
      <div className="flex justify-between">
        <Skeleton height="20px" width="40%"></Skeleton>
        <Skeleton height="20px" width="30%"></Skeleton>
      </div>
    </div>
  );
}
