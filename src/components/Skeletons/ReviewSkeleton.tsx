import { Skeleton } from "@chakra-ui/react";

export default function RatingSection() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton height="30px" width="40%"></Skeleton>
      <Skeleton height="80px" width="100%"></Skeleton>
      <Skeleton height="30px" width="80px" className="self-end"></Skeleton>
      <Skeleton height="50px" width="100%"></Skeleton>
      <Skeleton height="50px" width="100%"></Skeleton>
    </div>
  );
}
