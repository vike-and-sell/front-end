import { Spinner } from "@chakra-ui/react";
import React, { forwardRef } from "react";

interface ListingGridProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

// Using forwardRef to allow ref to be passed to the main element
const ListingsGrid = forwardRef<HTMLDivElement, ListingGridProps>(
  ({ children, isLoading }, ref) => {
    return (
      <>
        <main
          ref={ref}
          className="w-full grid px-4 pb-4 pt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:overflow-y-scroll min-h-[400px]"
        >
          {children}
        </main>
        {isLoading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </>
    );
  }
);

export default ListingsGrid;
