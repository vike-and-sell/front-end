import { useNavigate } from "react-router-dom";
import { Listing } from "../utils/interfaces";
import { MdOutlineHandshake } from "react-icons/md";

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
      className="flex flex-col shadow border-solid border-2 border-slate-300 aspect-square rounded-3xl p-4 justify-between overflow-y-auto hover:scale-105 transition-all cursor-pointer"
    >
      <div className="font-semibold text-lg lg:text-xl">
        {listingInfo.title}
      </div>
      <div className="flex flex-col">
        {listingInfo.forCharity ? (
          <div className="self-end">
            <MdOutlineHandshake
              color="#166aac"
              size="18px"
            ></MdOutlineHandshake>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between lg:text-md">
          <span>{postedDate}</span>
          <span className="text-green-700 font-bold">${listingInfo.price}</span>
        </div>
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
