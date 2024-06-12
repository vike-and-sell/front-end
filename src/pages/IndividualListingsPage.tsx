import PageHeading from "../components/PageHeading";
import DefaultButton from "../components/Button";
import RatingSection from "../components/Ratings/ReviewCommentArea";
export default function IndividualListing() {
  // Individual Listing Should Get Information From Parent?
  // Repass Listing ID instead, things to be considered?
  // Add a back button possibly?

  return (
    <main className='p-4 flex flex-col'>
      <PageHeading title='Chimac Honey Mustard Chicken'></PageHeading>
      <div className='flex flex-col items-start gap-4 lg:gap-6 mb-12'>
        <div className='text-green-700 font-bold text-2xl'>$29</div>
        <div className='text-sm'>
          Listed 12 hours ago by
          <span className='font-bold'> hungryyumyumman</span>
        </div>
        <div className='flex gap-4'>
          <DefaultButton title='Message Seller'></DefaultButton>
          <DefaultButton title='View Seller'></DefaultButton>
        </div>
      </div>
      <RatingSection></RatingSection>
    </main>
  );
}
