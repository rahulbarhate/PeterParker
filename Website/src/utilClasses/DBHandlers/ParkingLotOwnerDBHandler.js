import { db } from "../../firebase/firebase";
class ParkingLotOwnerDBHandler {
  constructor(owner) {
    if (typeof owner == string) {
      this.owner_id = owner;
    } else {
      this.owner = owner;
    }
    this.databaseRef = "ParkingLotOwner/";
  }
  addToFirebase = () => {
    db.ref(this.databaseRef + this.owner.id).set(this.owner);
  };
  getFromFirebase = () => {
    let foo = null;
    db.ref(this.databaseRef + this.owner_id).on("value", snapshot => {
      foo = snapshot.val();
    });
    return foo;
  };
}
export default ParkingLotOwnerDBHandler;
