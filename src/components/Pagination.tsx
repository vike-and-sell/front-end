//import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  handleNext: () => void;
  handlePrev: () => void;
}

export default function PaginationBar({
  currentPage,
  totalPages,
  handleNext,
  handlePrev,
}: PaginationBarProps) {
  return (
    <>
      <div className="flex text-black gap-2 items-center mb-2">
        <button
          className=" p-1  disabled:invisible bg-pri-blue rounded-full"
          disabled={currentPage == 1}
          onClick={handlePrev}
        >
          <FaArrowLeft size={13} color="white" />
        </button>
        <span className="font-bold text-pri-blue">
          {currentPage} / {totalPages}
        </span>
        <button
          className=" p-1 disabled:invisible bg-pri-blue rounded-full"
          disabled={currentPage == totalPages}
          onClick={handleNext}
        >
          <FaArrowRight size={13} color="white" />
        </button>
      </div>
    </>
  );
}
