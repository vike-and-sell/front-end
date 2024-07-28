import { ChatType } from "./interfaces";

export const mockChatPaneItems: ChatType[] = [
    {
      chatId: "1",
      users: ["1", "2"],
      listingId: "1",
      listingInfo: {
        forCharity:true,
        sellerId: "1",
        listingId: "1",
        title: "Vintage Chair",
        price: 150,
        location: "V9A",
        status: "AVAILABLE",
        listedAt: "2023-06-15T14:48:00.000Z",
        lastUpdatedAt: "2023-06-20T10:00:00.000Z"
      },
      lastMessageTime: "2023-07-19T15:00:00.000Z",
      interlocutor: {
        userId: "2",
        username: "Buyer1",
        location: "Brooklyn, NY",
        joiningDate: "2023-01-12",
        itemsSold: [],
        itemsPurchased: ["1"],
        current: true
      }
    },
    {
      chatId: "2",
      users: ["3", "4"],
      listingId: "2",
      listingInfo: {
        forCharity:true,
        sellerId: "3",
        listingId: "2",
        title: "Antique Table",
        price: 300,
        location: "V8T",
        status: "AVAILABLE",
        listedAt: "2023-06-10T09:30:00.000Z",
        lastUpdatedAt: "2023-06-15T12:00:00.000Z"
      },
      lastMessageTime: "2023-07-20T16:00:00.000Z",
      interlocutor: {
        userId: "4",
        username: "buyer2",
        location: "Santa Monica, CA",
        joiningDate: "2023-02-05",
        itemsSold: [],
        itemsPurchased: ["2"],
        current: true
      }
    },
    {
      chatId: "3",
      users: ["5", "6"],
      listingId: "3",
      listingInfo: {
        forCharity:true,
        sellerId: "5",
        listingId: "3",
        title: "Handmade Rug",
        price: 200,
        location: "V9B",
        status: "SOLD",
        listedAt: "2023-05-20T11:15:00.000Z",
        lastUpdatedAt: "2023-05-25T09:45:00.000Z"
      },
      lastMessageTime: "2023-07-21T14:00:00.000Z",
      interlocutor: {
        userId: "6",
        username: "buyer3",
        location: "Dallas, TX",
        joiningDate: "2023-03-15",
        itemsSold: [],
        itemsPurchased: ["3"],
        current: false
      }
    },
    {
      chatId: "4",
      users: ["7", "8"],
      listingId: "4",
      listingInfo: {
        forCharity:true,
        sellerId: "7",
        listingId: "4",
        title: "Painting",
        price: 500,
        location: "V8W",
        status: "AVAILABLE",
        listedAt: "2023-07-01T13:20:00.000Z",
        lastUpdatedAt: "2023-07-15T11:00:00.000Z"
      },
      lastMessageTime: "2023-07-21T10:00:00.000Z",
      interlocutor: {
        userId: "8",
        username: "4",
        location: "Orlando, FL",
        joiningDate: "2023-04-20",
        itemsSold: [],
        itemsPurchased: ["4"],
        current: true
      }
    }
  ];
  