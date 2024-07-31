import { Skeleton, Divider } from "@chakra-ui/react";
import ReviewSkeleton from "./ReviewSkeleton";

export default function IndividualListingsPageSkeleton() {
  return (
    <main className='p-4 flex flex-col lg:flex-row lg:overflow-y-scroll lg:max-h-[calc(100vh-150px)] gap-4'>
      <div className='grow flex flex-col gap-4'>
        <Skeleton height='40px' width='75%'></Skeleton>
        <div className='flex flex-col items-start gap-4 lg:gap-6 mb-12'>
          <Skeleton height='40px' width='25%'></Skeleton>
          <Skeleton height='20px' width='25%'></Skeleton>
          <div className='flex gap-4 w-full'>
            <Skeleton height='30px' width='80px'></Skeleton>
            <Skeleton height='30px' width='80px'></Skeleton>
          </div>
        </div>
        <Divider></Divider>
        <ReviewSkeleton></ReviewSkeleton>
      </div>
      <Skeleton height='calc(100vh-150px)' width='20%'></Skeleton>;
    </main>
  );
}
