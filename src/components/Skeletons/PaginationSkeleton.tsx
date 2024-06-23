//import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { SkeletonCircle } from "@chakra-ui/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function PaginationBarSkeleton() {
  return (
    <>
      <div className="flex text-black gap-2 items-center mb-2">
        <button className=" p-1 bg-pri-blue rounded-full">
          <FaArrowLeft size={13} color="white" />
        </button>
        <SkeletonCircle></SkeletonCircle>
        <button className=" p-1  bg-pri-blue rounded-full">
          <FaArrowRight size={13} color="white" />
        </button>
      </div>
    </>
  );
}
