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
    },
    {
      "sellerId": "54321",
      "listingId": "9876543210",
      "title": "Sony PlayStation 5",
      "price": 499.99,
      "location": "945",
      "status": "AVAILABLE",
      "listedAt": "2024-06-10T08:45:12Z",
      "lastUpdatedAt": "2024-06-10T08:45:12Z"
    },
    {
      "sellerId": "98765",
      "listingId": "1234567890",
      "title": "Logitech Wireless Keyboard",
      "price": 39.99,
      "location": "V9A",
      "status": "AVAILABLE",
      "listedAt": "2024-06-09T15:20:30Z",
      "lastUpdatedAt": "2024-06-09T15:20:30Z"
    },
    {
      "sellerId": "24680",
      "listingId": "1357924680",
      "title": "Amazon Echo Dot (4th Gen)",
      "price": 29.99,
      "location": "950",
      "status": "AVAILABLE",
      "listedAt": "2024-06-08T10:00:00Z",
      "lastUpdatedAt": "2024-06-08T10:00:00Z"
    },
    {
        "sellerId": "13579",
        "listingId": "2468013579",
        "title": "Nintendo Switch OLED Model",
        "price": 349.99,
        "location": "V7Y",
        "status": "AVAILABLE",
        "listedAt": "2024-06-11T11:45:00Z",
        "lastUpdatedAt": "2024-06-11T11:45:00Z"
      },
      {
        "sellerId": "97531",
        "listingId": "9876543210",
        "title": "Sony WH-1000XM4 Wireless Headphones",
        "price": 299.00,
        "location": "941",
        "status": "SOLD",
        "listedAt": "2024-06-09T17:30:45Z",
        "lastUpdatedAt": "2024-06-09T17:30:45Z"
      },
      {
        "sellerId": "86420",
        "listingId": "987654321",
        "title": "GoPro HERO9 Black",
        "price": 449.99,
        "location": "V8Z",
        "status": "AVAILABLE",
        "listedAt": "2024-06-10T14:20:00Z",
        "lastUpdatedAt": "2024-06-10T14:20:00Z"
      },
      {
        "sellerId": "24601",
        "listingId": "1357924680",
        "title": "Bose QuietComfort 45 Wireless Headphones",
        "price": 329.00,
        "location": "945",
        "status": "AVAILABLE",
        "listedAt": "2024-06-08T12:00:00Z",
        "lastUpdatedAt": "2024-06-08T12:00:00Z"
      },
      {
        "sellerId": "75309",
        "listingId": "1234567890",
        "title": "LG 65-Inch OLED 4K Smart TV",
        "price": 2499.99,
        "location": "V9B",
        "status": "AVAILABLE",
        "listedAt": "2024-06-07T09:15:30Z",
        "lastUpdatedAt": "2024-06-07T09:15:30Z"
      },
      {
        "sellerId": "95173",
        "listingId": "456789123",
        "title": "Canon EOS R6 Mirrorless Camera",
        "price": 2499.00,
        "location": "902",
        "status": "SOLD",
        "listedAt": "2024-06-06T16:40:00Z",
        "lastUpdatedAt": "2024-06-06T16:40:00Z"
      },
      {
        "sellerId": "86429",
        "listingId": "9876543210",
        "title": "Microsoft Surface Laptop 4",
        "price": 1299.99,
        "location": "V7Y",
        "status": "AVAILABLE",
        "listedAt": "2024-06-05T10:30:00Z",
        "lastUpdatedAt": "2024-06-05T10:30:00Z"
      },
      {
        "sellerId": "13579",
        "listingId": "1234567890",
        "title": "KitchenAid Stand Mixer",
        "price": 399.99,
        "location": "V6T",
        "status": "AVAILABLE",
        "listedAt": "2024-06-04T14:00:00Z",
        "lastUpdatedAt": "2024-06-04T14:00:00Z"
      },
      {
        "sellerId": "97531",
        "listingId": "456789123",
        "title": "Fitbit Charge 4 Fitness Tracker",
        "price": 129.95,
        "location": "940",
        "status": "SOLD",
        "listedAt": "2024-06-03T11:10:00Z",
        "lastUpdatedAt": "2024-06-03T11:10:00Z"
      },
      {
        "sellerId": "86420",
        "listingId": "2468013579",
        "title": "Nintendo Switch Lite",
        "price": 199.99,
        "location": "V8Z",
        "status": "AVAILABLE",
        "listedAt": "2024-06-02T13:45:00Z",
        "lastUpdatedAt": "2024-06-02T13:45:00Z"
      },
      {
        "sellerId": "24680",
        "listingId": "1357924681",
        "title": "Sony 65-Inch 4K Ultra HD Smart LED TV",
        "price": 1499.99,
        "location": "V6T",
        "status": "AVAILABLE",
        "listedAt": "2024-06-12T09:00:00Z",
        "lastUpdatedAt": "2024-06-12T09:00:00Z"
      },
      {
        "sellerId": "97531",
        "listingId": "9876543211",
        "title": "Apple AirPods Pro",
        "price": 249.00,
        "location": "902",
        "status": "SOLD",
        "listedAt": "2024-06-11T15:30:00Z",
        "lastUpdatedAt": "2024-06-11T15:30:00Z"
      },
      {
        "sellerId": "86420",
        "listingId": "4567891231",
        "title": "Nintendo Switch Animal Crossing Edition",
        "price": 299.99,
        "location": "V8Z",
        "status": "AVAILABLE",
        "listedAt": "2024-06-10T11:00:00Z",
        "lastUpdatedAt": "2024-06-10T11:00:00Z"
      },
      {
        "sellerId": "24601",
        "listingId": "2468013571",
        "title": "Bose SoundLink Revolve+ Portable Bluetooth Speaker",
        "price": 299.00,
        "location": "V7Y",
        "status": "SOLD",
        "listedAt": "2024-06-09T16:00:00Z",
        "lastUpdatedAt": "2024-06-09T16:00:00Z"
      },
      {
        "sellerId": "75309",
        "listingId": "1234567891",
        "title": "Samsung 49-Inch Odyssey G9 Gaming Monitor",
        "price": 1499.99,
        "location": "V9B",
        "status": "AVAILABLE",
        "listedAt": "2024-06-08T13:30:00Z",
        "lastUpdatedAt": "2024-06-08T13:30:00Z"
      },
      {
        "sellerId": "95173",
        "listingId": "9876543212",
        "title": "Garmin Forerunner 945 GPS Running Watch",
        "price": 599.99,
        "location": "940",
        "status": "AVAILABLE",
        "listedAt": "2024-06-07T10:45:00Z",
        "lastUpdatedAt": "2024-06-07T10:45:00Z"
      },
      {
        "sellerId": "86429",
        "listingId": "1357924682",
        "title": "Google Nest Hub Max",
        "price": 229.00,
        "location": "V6T",
        "status": "AVAILABLE",
        "listedAt": "2024-06-06T08:15:00Z",
        "lastUpdatedAt": "2024-06-06T08:15:00Z"
      },
      {
        "sellerId": "13579",
        "listingId": "9876543213",
        "title": "Microsoft Xbox Series X",
        "price": 499.99,
        "location": "V7Y",
        "status": "AVAILABLE",
        "listedAt": "2024-06-05T14:30:00Z",
        "lastUpdatedAt": "2024-06-05T14:30:00Z"
      },
      {
        "sellerId": "97531",
        "listingId": "4567891232",
        "title": "Dyson V11 Torque Drive Cordless Vacuum Cleaner",
        "price": 699.00,
        "location": "902",
        "status": "SOLD",
        "listedAt": "2024-06-04T11:00:00Z",
        "lastUpdatedAt": "2024-06-04T11:00:00Z"
      },
      {
        "sellerId": "86420",
        "listingId": "2468013572",
        "title": "Apple iPad Pro 12.9-Inch (2021)",
        "price": 1099.00,
        "location": "V8Z",
        "status": "AVAILABLE",
        "listedAt": "2024-06-03T09:45:00Z",
        "lastUpdatedAt": "2024-06-03T09:45:00Z"
      }
  ];



const listingReviews = {
    "123456789": [
        "Great monitor, works perfectly!",
        "Exactly as described, fast shipping.",
        "Highly recommend this seller.",
        "Good packaging, arrived undamaged.",
        "Responsive seller, quick to answer questions."
    ],
    "987654321": [
        "Awesome phone, love the camera!",
        "Fast delivery, brand new condition.",
        "Battery life is excellent.",
        "Great customer service from the seller.",
        "Very happy with my purchase, thank you!"
    ],
    "456789123": []  // No reviews yet for this listing
};



const listingIDs = mockListingData.map(obj => obj.listingId)

export function getListingIDs () {
    return listingIDs;
}


export function getListingInfoFromID(listingID:string | undefined) {
    const targetListing = mockListingData.filter((listing) => {
        if (listing.listingId === listingID) {
            return listing;
        }
    })
    if (targetListing.length == 0) {
        return {
            "sellerId": "86420",
            "listingId": "2468013572",
            "title": "Apple iPad Pro 12.9-Inch (2021)",
            "price": 1099.00,
            "location": "V8Z",
            "status": "AVAILABLE",
            "listedAt": "2024-06-03T09:45:00Z",
            "lastUpdatedAt": "2024-06-03T09:45:00Z"
        }
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
