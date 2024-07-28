import React, { forwardRef } from "react";

interface ListingGridProps {
  children: React.ReactNode;
}

// Using forwardRef to allow ref to be passed to the main element
const ListingsGrid = forwardRef<HTMLDivElement, ListingGridProps>(
  ({ children }, ref) => {
    return (
      <main
        ref={ref}
        className="grid px-4 pb-4 pt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:overflow-y-scroll lg:max-h-[calc(100vh-250px)] min-h-[400px]"
      >
        {children}
      </main>
    );
  }
);

export default ListingsGrid;
