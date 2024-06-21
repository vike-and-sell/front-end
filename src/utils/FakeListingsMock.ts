const mockListingData = [
    {
      sellerId: "10011",
      listingId: "100000011",
      title: "Sony PlayStation 5",
      price: 500.0,
      location: "V6G",
      status: "SOLD",
      listedAt: "2024-05-12T06:30:00Z",
      lastUpdatedAt: "2024-05-12T06:30:00Z",
    },
    {
      sellerId: "10012",
      listingId: "100000012",
      title: "Bose QuietComfort 35",
      price: 300.0,
      location: "V5W",
      status: "AVAILABLE",
      listedAt: "2024-05-11T05:15:45Z",
      lastUpdatedAt: "2024-05-11T05:15:45Z",
    },
    {
      sellerId: "10013",
      listingId: "100000013",
      title: "Microsoft Surface Pro 7",
      price: 850.0,
      location: "V8V",
      status: "SOLD",
      listedAt: "2024-05-10T04:10:30Z",
      lastUpdatedAt: "2024-05-10T04:10:30Z",
    },
    {
      sellerId: "10014",
      listingId: "100000014",
      title: "JBL Flip 5 Bluetooth Speaker",
      price: 100.0,
      location: "V6H",
      status: "AVAILABLE",
      listedAt: "2024-05-09T03:05:15Z",
      lastUpdatedAt: "2024-05-09T03:05:15Z",
    },
    {
      sellerId: "10015",
      listingId: "100000015",
      title: "Canon EOS Rebel T7",
      price: 400.0,
      location: "V5X",
      status: "SOLD",
      listedAt: "2024-05-08T02:00:00Z",
      lastUpdatedAt: "2024-05-08T02:00:00Z",
    },
];

const listingReviews = {
  "123456789": [
    "Great monitor, works perfectly!",
    "Exactly as described, fast shipping.",
    "Highly recommend this seller.",
    "Good packaging, arrived undamaged.",
    "Responsive seller, quick to answer questions.",
  ],
  "987654321": [
    "Awesome phone, love the camera!",
    "Fast delivery, brand new condition.",
    "Battery life is excellent.",
    "Great customer service from the seller.",
    "Very happy with my purchase, thank you!",
  ],
  "456789123": [], // No reviews yet for this listing
};


export function getListingIDs() {

  return mockListingData;
}

export function getListingInfoFromID(listingID: string | undefined) {
  const targetListing = mockListingData.filter((listing) => {
    if (listing.listingId === listingID) {
      return listing;
    }
  });
  if (targetListing.length == 0) {
    return {
      sellerId: "86420",
      listingId: "2468013572",
      title: "Apple iPad Pro 12.9-Inch (2021)",
      price: 1099.0,
      location: "V8Z",
      status: "AVAILABLE",
      listedAt: "2024-06-03T09:45:00Z",
      lastUpdatedAt: "2024-06-03T09:45:00Z",
    };
  }
  return targetListing[0];
}

export function getReviews(listingID: string) {
  if (listingID in listingReviews) {
    return listingReviews[listingID];
  } else {
    return [];
  }
}
