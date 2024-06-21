interface ListingGridProps {
  children: React.ReactNode;
}

// TODO Listing grid could be modified to take a paramter to change the lg:max-h-[calc(100vh-250px)]
export default function ListingsGrid({ children }: ListingGridProps) {
  return (
    <main className='grid p-4 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:overflow-y-scroll lg:max-h-[calc(100vh-250px)]'>
      {children}
    </main>
  );
}
