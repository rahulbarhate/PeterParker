import { db } from "../../firebase/firebase";
import { type } from "os";
import CarOwner from "../CarOwner";
import { string } from "prop-types";
class CarOwnerDBHandler {
  constructor(carOwner) {
    if (typeof carOwner == CarOwner) {
      this.carOwner = carOwner;
    } else if (typeof carOwner == string) {
      this.carOwnerid = carOwner;
    }
    this.dataBaseRef = "CarOwners/";
  }
  addToFirebase = () => {
    db.ref(this.dataBaseRef + this.carOwner.id)
      .set(this.carOwner)
      .then(res => {
        console.log(res);
      });
  };
  getFromFirebase = () => {
    let foo = null;
    db.ref(this.dataBaseRef + this.carOwnerid).on("value", snapshot => {
      console.log(snapshot.val());
      foo = snapshot.val();
    });
    return foo;
  };
  // Will add Delete and Update function when required
}

export default CarOwnerDBHandler;
