import { useNavigate } from "react-router-dom";
import { Listing } from "../utils/interfaces";
import { Skeleton } from "@chakra-ui/react";

// need to import listing object here
interface ListingIDProps {
  listingInfo: Listing;
}

export function ListingCard({ listingInfo }: ListingIDProps) {
  const postedDate = getMonthAndDate(listingInfo.listedAt);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/listing/${listingInfo.listingId}`)}
      className="flex flex-col shadow border-solid border-2 border-slate-300 aspect-square rounded-3xl p-4 justify-between overflow-y-auto hover:scale-105 transition-all "
    >
      <div className="font-semibold text-lg">{listingInfo.title}</div>
      <div className="flex justify-between">
        <span>{postedDate}</span>
        <span className="text-green-700 font-bold">${listingInfo.price}</span>
      </div>
    </div>
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="flex flex-col shadow border-solid border-2 border-slate-300 aspect-square rounded-3xl p-4 justify-between overflow-y-auto hover:scale-105 transition-all ">
      <Skeleton height="20px"></Skeleton>
      <div className="flex justify-between">
        <Skeleton height="20px" width="40%"></Skeleton>
        <Skeleton height="20px" width="30%"></Skeleton>
      </div>
    </div>
  );
}

function getMonthAndDate(timestamp: string): string {
  const date = new Date(timestamp);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  return `${month} ${day}`;
}
