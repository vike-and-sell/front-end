import { Divider } from "@chakra-ui/react";
import PageHeading from "../PageHeading";
import { Skeleton } from "@chakra-ui/react";

export default function CharityPageSkeleton() {
  return (
    <main className='px-4'>
      <PageHeading title='Charities'></PageHeading>
      <h2 className='font-semibold text-pri-blue text-xl p-0'>
        Active Charity
      </h2>
      <div className='flex flex-col p-4 gap-3'>
        <CharityCardSkeleton></CharityCardSkeleton>
        <CharityCardSkeleton></CharityCardSkeleton>
        <CharityCardSkeleton></CharityCardSkeleton>
        <CharityCardSkeleton></CharityCardSkeleton>
      </div>
      <Divider mb='4px'></Divider>
      <h2 className='font-semibold text-pri-blue text-xl p-0'>
        Past Charities
      </h2>
      <div className='flex flex-col p-4'>
        <CharityCardSkeleton></CharityCardSkeleton>
        <CharityCardSkeleton></CharityCardSkeleton>
        <CharityCardSkeleton></CharityCardSkeleton>
        <CharityCardSkeleton></CharityCardSkeleton>
      </div>
    </main>
  );
}

function CharityCardSkeleton() {
  return (
    <div className='flex justify-between items-center border-slate-300 border-[1.5px] rounded-2xl py-4 px-5'>
      <div className='flex gap-4'>
        <div>
          <Skeleton height='100px' width='100px'></Skeleton>
        </div>
        <div className='flex flex-col  justify-center gap-2'>
          <Skeleton height='20px' width='150px'></Skeleton>
          <div className=' text-pri-blue p-0 text-sm'>
            <Skeleton height='15px' width='100px'></Skeleton>
          </div>
          <Skeleton height='10px' width='100px'></Skeleton>
        </div>
      </div>
    </div>
  );
}
