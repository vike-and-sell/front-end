import { useNavigate } from "react-router-dom";
import { Listing } from "../utils/interfaces";
import { MdOutlineHandshake } from "react-icons/md";
import { Badge } from "@chakra-ui/react";

// need to import listing object here
interface ListingIDProps {
  listingInfo: Listing;
}

export function ListingCard({ listingInfo }: ListingIDProps) {
  const postedDate = getMonthAndDate(listingInfo.listedAt);
  const navigate = useNavigate();
  const title = truncateString(listingInfo.title);
  return (
    <div
      onClick={() => navigate(`/listing/${listingInfo.listingId}`)}
      className='listing-card flex flex-col shadow border-solid border-2 border-slate-300 aspect-square rounded-3xl p-4 justify-between overflow-y-auto  cursor-pointer'
    >
      <div className='font-semibold  sm:text-sm md:text-base lg:text-xl'>
        {title}
      </div>
      <div className='flex flex-col'>
        {listingInfo.forCharity ? (
          <div className='self-end'>
            <MdOutlineHandshake
              color='#166aac'
              size='18px'
            ></MdOutlineHandshake>
          </div>
        ) : (
          ""
        )}
        <div className='flex justify-between items-baseline'>
          <span className='text-sm '>{postedDate}</span>
          {listingInfo.status != "AVAILABLE" ? (
            <Badge colorScheme='red' data-cy='listing-status-badge'>
              {listingInfo.status}
            </Badge>
          ) : (
            <span className='text-green-700 font-bold text-sm md:text-base lg:text-lg'>
              ${listingInfo.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function getMonthAndDate(timestamp: string): string {
  const date = new Date(timestamp);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
}

function truncateString(input: string) {
  if (input.length > 40) {
    return input.slice(0, 40) + "...";
  } else {
    return input;
  }
}
