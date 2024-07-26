import { Listing, UserSearchItem } from "./interfaces";

export function arrayPagination(
  arr: Listing[] | UserSearchItem[],
  currentPage: number,
  maxListingsPerPage: number
) {
  const totalListings = arr.length - 1;
  const start = (currentPage - 1) * maxListingsPerPage;
  if (start + maxListingsPerPage > totalListings) {
    return arr.slice(start);
  } else {
    return arr.slice(start, start + maxListingsPerPage);
  }
}
