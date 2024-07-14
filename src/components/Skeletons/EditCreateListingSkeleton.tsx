import { Skeleton } from "@chakra-ui/react";

export default function EditCreateSkeleton() {
  return (
    <main className="px-4">
      <Skeleton height="40px" width="75%"></Skeleton>
      <div className="">
        <div className="my-4">
          <Skeleton height="20px" width="25%"></Skeleton>
        </div>

        <div className="my-4">
          <Skeleton height="20px" width="25%"></Skeleton>
        </div>

        <div className="my-4">
          <Skeleton height="20px" width="25%"></Skeleton>
          <Skeleton height="20px" width="25%"></Skeleton>
        </div>
        <div className="my-5"></div>
        <div className="my-5 flex">
          <Skeleton height="30px" width="80px"></Skeleton>
          <Skeleton height="30px" width="80px"></Skeleton>
        </div>
      </div>
    </main>
  );
}
