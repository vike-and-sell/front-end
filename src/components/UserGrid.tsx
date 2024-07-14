import React, { forwardRef } from "react";

interface UserGrid {
  children: React.ReactNode;
}

// Using forwardRef to allow ref to be passed to the main element
const UserGrid = forwardRef<HTMLDivElement, UserGrid>(({ children }, ref) => {
  return (
    <main
      ref={ref}
      className="flex flex-col px-4 pb-4 pt-2 lg:overflow-y-scroll lg:max-h-[calc(100vh-250px)] min-h-[400px]"
    >
      {children}
    </main>
  );
});

export default UserGrid;
