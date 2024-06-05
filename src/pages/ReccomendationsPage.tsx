import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";

export default function ReccomendationsPage() {
  return (
    <>
      <main className=' px-4'>
        <PageHeading title='Your Reccomendations'></PageHeading>
        <ListingsGrid>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
          <ListingCard></ListingCard>
        </ListingsGrid>
      </main>
    </>
  );
}
