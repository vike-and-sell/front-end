const mockListingData = [
    {
      "sellerId": "12345",
      "listingId": "123456789",
      "title": "Dell Monitor 1080p",
      "price": 110.00,
      "location": "V8T",
      "status": "SOLD",
      "listedAt": "2024-05-22T12:34:56Z",
      "lastUpdatedAt": "2024-05-22T12:34:56Z"
    },
    {
      "sellerId": "67890",
      "listingId": "987654321",
      "title": "Samsung Galaxy S21",
      "price": 799.99,
      "location": "902",
      "status": "SOLD",
      "listedAt": "2024-06-01T09:22:33Z",
      "lastUpdatedAt": "2024-06-01T09:22:33Z"
    },
    {
      "sellerId": "11223",
      "listingId": "456789123",
      "title": "Apple MacBook Pro 16\"",
      "price": 2500.00,
      "location": "940",
      "status": "SOLD",
      "listedAt": "2024-04-15T14:10:05Z",
      "lastUpdatedAt": "2024-04-15T14:10:05Z"
    }
]



export function getListingInfoFromID(listingID:string | undefined) {
    const targetListing = mockListingData.filter((listing) => {
        if (listing.listingId === listingID) {
            return listing;
        }
    })

    return targetListing[0];
}

