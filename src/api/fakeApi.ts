export const fetchUserInfo = () => new Promise(
  (resolve, reject) => {
    setTimeout(() => resolve({
      firstName: "Canssio",
      lastName: "Antonio",
      gender: "Male",
      reservationId: 2
    }), Math.random() * 100);
  }
);

export const fetchList = () => new Promise((resolve, reject) => {
  console.log('fetchList run');
  
  setTimeout(() => {
    resolve([
      {
        id: 1,
        name: "City View Standard Room",
        description: "1 Queen bed",

      },
      {
        id: 2,
        name: "Ocean View Standard Room",
        description: "1 Queen bed",
      },
      {
        id: 3,
        name: "Deluxe Room, City View",
        description: "2 Double beds",
      },
      {
        id: 4,
        name: "Deluxe Room, Ocean View",
        description: "2 Double beds",
      },
      {
        id: 5,
        name: "Grand Lux Room, Oceanfront",
        description: "1 King bed and 1 Sofa bed",
      },
      {
        id: 6,
        name: "Royal Suite, Oceanfront",
        description: "2 king beds",
      }
    ])
  }, Math.random() * 100);
})
