import { db } from "../../firebase/firebase";
class CarDBHandler {
  constructor(car) {
    // Pass car object as parameter. Create using let car = new Car(parameters)
    if (typeof car == string) {
    } else {
      this.car = car;
    }
    this.databaseRef = "Car/";
  }

  addToFirebase = () => {
    db.ref(this.databaseRef + this.car.id)
      .set(this.car)
      .then(res => console.log(res));
  };

  getFromFirebase = () => {
    let foo = null;
    db.ref(this.databaseRef + this.car.id).on("value", snapshot => {
      foo = snapshot.val();
      console.log(foo);
    });
    return foo;
  };
}
export default CarDBHandler;
