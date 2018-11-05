import { db } from "../../firebase/firebase";
import ParkingLot from "../ParkingLot";
class ParkingLotDBHandler {
  constructor(parkingLot) {
    this.parkingLot = parkingLot;
    this.databaseRef = "ParkingLot/";
  }
  addToFirebase = () => {
    console.log(this.parkingLot);
    db.ref(this.databaseRef + this.parkingLot.owner).set(
      JSON.stringify(this.parkingLot)
    );
  };
  update = () => {
    db.ref(this.databaseRef + this.parkingLot.owner.id).update({
      coordinates: this.parkingLot.coordinates,
      owner: this.parkingLot.owner,
      cars: this.parkingLot.cars
    });
  };
  getFromFirebase = () => {
    let foo = null;
    db.ref(this.databaseRef + this.parkingLot).on("value", snapshot => {
      console.log(snapshot.val());
      return snapshot.val();
    });
    return foo;
  };
}
export default ParkingLotDBHandler;
