export function ListingCard() {
  return (
    <div className='flex flex-col shadow border-solid border-2 border-slate-300 aspect-square rounded-3xl p-4 justify-between'>
      <div className='font-semibold text-lg'>Example Title</div>
      <div className='flex justify-between'>
        <span>June 21</span>
        <span>$20</span>
      </div>
    </div>
  );
}

export function ListingHeading() {
  return <div></div>;
}

export function ListingPriceDate() {}

export function ListingOptionsButton() {}
