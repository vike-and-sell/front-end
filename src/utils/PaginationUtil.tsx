import { Listing } from "./interfaces";

export function arrayPagination(
  arr: Listing[],
  currentPage: number,
  maxListingsPerPage: number
) {
  console.log(arr);
  const totalListings = arr.length - 1;
  const start = currentPage * maxListingsPerPage; // WTF is this
  if (start + maxListingsPerPage > totalListings) {
    return arr.slice(start);
  } else {
    console.log(`Start ${start} End : ${start + maxListingsPerPage}`);
    return arr.slice(start, start + maxListingsPerPage);
  }
}
