//import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { SkeletonCircle } from "@chakra-ui/react";

export default function PaginationBarSkeleton() {
  return (
    <>
      <div className='flex text-black gap-2 items-center mb-2'>
        <SkeletonCircle size='5'></SkeletonCircle>
        <SkeletonCircle></SkeletonCircle>
        <SkeletonCircle size='5'></SkeletonCircle>
      </div>
    </>
  );
}
