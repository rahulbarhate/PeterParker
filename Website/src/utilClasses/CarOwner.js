import {} from "./DBHandler/CarOwner";
import CarOwnerDBHandler from "./DBHandlers/CarOwnerDBHandler";
class CarOwner {
  constructor(name, car, email, phone_number) {
    // Only to be used when the owner does not exist in Database
    // Generate Unique Id for CarOwner
    // Generate Unique Id using phone + name
    // Checking if only id is passed (in js you cant have multiple definitions of the constructor)
    if (car == null && email == null && phone_number) {
      this.getFromDB();
    } else {
      this.name = name;
      this.car = car;
      this.email = email;
      this.phone_number = phone_number;
      this.id = this.generate_id();
    }
  }
  generate_id = () => {
    return this.phone_number;
  };
  uploadToDB = () => {
    new CarOwnerDBHandler(this).addToFirebase();
  };
  getFromDB = () => {
    let res = new CarOwnerDBHandler(this.id).getFromFirebase();
    this.name = res.name;
    this.email = res.email;
    this.car = res.car;
  };
}
export default CarOwner;
