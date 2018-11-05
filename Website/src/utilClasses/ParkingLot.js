import ParkingLotDBHandler from "./DBHandlers/ParkingLotDBHandler";
class ParkingLot {
  constructor(coordinates, owner, cars) {
    // coordinates object will have lat and lng attributes
    if (coordinates && owner && cars) {
      this.coordinates = coordinates;
      this.owner = owner;
      this.cars = cars;
    } else {
    }
  }
  addCarToLot = new_car => {
    this.cars.push(new_car);
  };
  uploadCarList = () => {
    new ParkingLotDBHandler({
      coordinates: this.coordinates,
      owner: this.owner,
      cars: this.cars
    });
  };
  addToDB = () => {
    new ParkingLotDBHandler({
      coordinates: this.coordinates,
      owner: this.owner,
      cars: this.cars
    }).addToFirebase();
  };
  getFromDB = () => {};
}

export default ParkingLot;
