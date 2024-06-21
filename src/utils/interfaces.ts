export interface Listing {
    sellerId: string;
    listingId: string;
    title: string;
    price: number;
    location: string; // Could be more specific if you have a pattern for lat/long or zip code
    status: string; // assuming there could be other statuses
    listedAt: string; // ISO 8601 date string
    lastUpdatedAt: string; // ISO 8601 date string
  }

