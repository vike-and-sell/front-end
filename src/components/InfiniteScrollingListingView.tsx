import { RefObject, useEffect, useState } from "react";
import { Listing } from "../utils/interfaces";
import { ListingCard } from "./ListingCard";
import ListingsGrid from "./ListingsGrid";

interface InfiniteScrollingListingViewProps {
  loadMore: (hash: string) => void;
  listings: Listing[];
  hash: string;
  scrollRef: RefObject<HTMLDivElement>;
}

export default function InfiniteScrollingListingView(
  props: InfiniteScrollingListingViewProps
) {
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const unique: Set<string> = new Set();
  const uniqueListings = props.listings.filter((l) => {
    if (!unique.has(l.listingId)) {
      unique.add(l.listingId);
      return true;
    }
    return false;
  });

  const oneTimeScrollListener = async (e: Event) => {
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
      setIsLoadingMore(true);
      await props.loadMore(props.hash);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const l = props.listings.length;
    props.scrollRef.current?.removeEventListener(
      "scroll",
      oneTimeScrollListener
    );
    document?.removeEventListener("scroll", oneTimeScrollListener);
    if (l > 0) {
      props.scrollRef.current?.addEventListener(
        "scroll",
        oneTimeScrollListener
      );
      document?.addEventListener("scroll", oneTimeScrollListener);
    }
  }, [props.listings]);

  return (
    <div
      className="w-full lg:max-h-[calc(100vh-250px)] lg:overflow-y-scroll"
      ref={props.scrollRef}
    >
      <ListingsGrid isLoading={isLoadingMore}>
        {uniqueListings.map((listing) => (
          <ListingCard
            listingInfo={listing}
            key={listing.listingId}
          ></ListingCard>
        ))}
      </ListingsGrid>
    </div>
  );
}
