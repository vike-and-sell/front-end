export interface User {
  userID: string;
  username: string;
  email: string;
  current?: boolean;
}

export interface MessageType {
  messageID: string;
  messageContent: string;
  senderID: string;
  receiverID: string;
  timestamp: number;
}

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

export interface FilterOptions {
  maxPrice?: string;
  minPrice?: string;
  isDescending?: boolean;
  status?: "SOLD" | "AVAILABLE" | "";
  sortBy?: "price" | "date" | "distance" | "";
}