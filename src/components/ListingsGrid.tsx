interface ListingGridProps {
  children: React.ReactNode;
}
export default function ListingsGrid({ children }: ListingGridProps) {
  return (
    <main className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 '>
      {children}
    </main>
  );
}
