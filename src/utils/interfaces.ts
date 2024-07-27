export interface User {
  userId: string;
  username: string;
  location: string;
  joiningDate: string;
  itemsSold: string[];
  itemsPurchased: string[];
  current?: boolean;
}

export interface MessageType {
  messageId: string;
  content: string;
  senderId: string;
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
  sortBy?: "price" | "created_on" | "location" | "";
  [key: string]: string | boolean | undefined;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ReviewInfo {
  username: string;
  created_on: string;
  review: string;
}

export interface AuthContextType {
  user: User | null;
  loginUser: (username: string, password: string) => Promise<any>;
  logoutUser: () => Promise<any>;
  requestAccount: (email: string, callback: string) => Promise<void>;
  verifyAccount: (
    jwt: string,
    username: string,
    password: string,
    location: string
  ) => Promise<void>;
  requestReset: (email: string, callback: string) => Promise<void>;
  verifyReset: (jwt: string, password: string) => Promise<void>;
  checkUserStatus: () => Promise<void>;
  isLoading: boolean;
}

export interface SessionType {
  user: User;
  expiration: number;
}

export interface UserSearchItem {
  username: string;
  userId: string;
}

export interface SearchResults {
  listings: Listing[];
  users: UserSearchItem[];
}

export interface ChatType {
  chatId: string;
  users: string[];
  listingId: string;
  listingInfo: Listing;
  lastMessageTime: string;
  interlocutor: User;
}
