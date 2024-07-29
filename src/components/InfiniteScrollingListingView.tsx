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
    // console.log(e);
    // console.log(e.target);
    const t = e.target as HTMLDivElement;

    const sh = t.scrollHeight ?? document.body.scrollHeight;
    const st = t.scrollTop ?? window.scrollY;
    const ch = t.clientHeight ?? window.outerHeight;

    const bottom = sh - st <= ch + 100;
    // console.log(`${sh}, ${st}, ${ch + 100}`);
    // console.log(`${sh - st} <= ${ch + 100}`);
    // console.log(bottom);
    if (bottom) {
      t.removeEventListener("scroll", oneTimeScrollListener);
      props.loadMore(props.hash);
    }
  };

  useEffect(() => {
    const l = props.listings.length;
    ref.current?.removeEventListener("scroll", oneTimeScrollListener);
    document?.removeEventListener("scroll", oneTimeScrollListener);
    if (l > 0) {
      ref.current?.addEventListener("scroll", oneTimeScrollListener);
      document?.addEventListener("scroll", oneTimeScrollListener);
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
