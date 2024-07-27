//import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

interface PaginationBarProps {
  currentPage: number;
  hasMore: boolean;
  handleNext: () => void;
  handlePrev: () => void;
  goToPage: (newPage: number) => void;
}

export default function PaginationBar({
  currentPage,
  hasMore,
  handleNext,
  handlePrev,
  goToPage,
}: PaginationBarProps) {
  function go(p: string) {
    const n = Number.parseInt(p, 10);
    if (!Number.isNaN(n)) {
      goToPage(n);
    }
  }

  return (
    <>
      <div className="flex text-black gap-2 items-center mb-2">
        <button
          className=" p-1  disabled:invisible bg-pri-blue rounded-full"
          disabled={currentPage == 1}
          onClick={handlePrev}
          title="Previous Page Button"
        >
          <FaArrowLeft size={13} color="white" />
        </button>
        <input
          className="font-bold text-pri-blue rounded-3xl p-2 w-12 text-center border-slate-300 border-2"
          onBlur={(e) => go(e.currentTarget.value)}
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              go(e.currentTarget.value);
            }
          }}
          placeholder={`${currentPage}`}
        />
        <button
          className=" p-1 disabled:invisible bg-pri-blue rounded-full"
          disabled={!hasMore}
          title="Next Page Button"
          onClick={handleNext}
        >
          <FaArrowRight size={13} color="white" />
        </button>
      </div>
    </>
  );
}
