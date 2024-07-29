import { useEffect, useRef } from "react";
import { Listing } from "../utils/interfaces";
import { ListingCard } from "./ListingCard";
import ListingsGrid from "./ListingsGrid";

interface InfiniteScrollingListingViewProps {
  loadMore: (hash: string) => void;
  listings: Listing[];
  hash: string;
}

export default function InfiniteScrollingListingView(
  props: InfiniteScrollingListingViewProps
) {
  const ref = useRef<HTMLDivElement>(null);

  const unique: Set<string> = new Set();
  const uniqueListings = props.listings.filter((l) => {
    if (!unique.has(l.listingId)) {
      unique.add(l.listingId);
      return true;
    }
    return false;
  });

  const oneTimeScrollListener = (e: Event) => {
    const t = e.target as HTMLDivElement;

    const bottom = t.scrollHeight - t.scrollTop <= t.clientHeight + 100;
    if (bottom) {
      t.removeEventListener("scroll", oneTimeScrollListener);
      props.loadMore(props.hash);
    }
  };

  useEffect(() => {
    const l = props.listings.length;
    console.log("useEffect called");
    ref.current?.removeEventListener("scroll", oneTimeScrollListener);
    if (l > 0) {
      ref.current?.addEventListener("scroll", oneTimeScrollListener);
    }
  }, [props.listings]);

  return (
    <>
      <ListingsGrid ref={ref}>
        {uniqueListings.map((listing) => (
          <ListingCard
            listingInfo={listing}
            key={listing.listingId}
          ></ListingCard>
        ))}
      </ListingsGrid>
    </>
  );
}
