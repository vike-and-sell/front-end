import { Skeleton } from "@chakra-ui/react";

export function UserListingSkeleton() {
  const loadingListings = [...Array(30).keys()];
  return (
    <main className="flex flex-col px-4 pb-4 pt-2 lg:overflow-y-scroll lg:max-h-[calc(100vh-250px)] min-h-[400px] gap-2">
      {loadingListings.map((index) => {
        return <UserCardSkeleton key={index}></UserCardSkeleton>;
      })}
    </main>
  );
}

export function UserCardSkeleton() {
  return <Skeleton height="20px" width="80%"></Skeleton>;
}
