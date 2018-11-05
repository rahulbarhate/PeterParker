import ParkingLotOwnerDBHandler from "./DBHandlers/ParkingLotOwnerDBHandler";
class ParkingLotOwner {
  constructor(name, phone_number) {
    if (name && phone_number) {
      this.name = name;
      this.phone_number = phone_number;
      this.id = this.generateId();
    } else {
    }
  }
  generateId = () => {
    return this.phone_number + this.name;
  };
  addToDB = () => {
    new ParkingLotOwnerDBHandler(this).addToFirebase();
  };
  getFromDB = () => {
    let res = new ParkingLotOwnerDBHandler(id).getFromFirebase();
    this.name = res.name;
    this.phone_number = res.phone_number;
  };
}
export default ParkingLotOwner;
