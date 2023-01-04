import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

type dataChangeAddressCustomer = {
  id: string,
  name: string,
  address: Address
}

export default class CustomerChangeAddressEvent implements EventInterface {

  dataTimeOccurred: Date;
  eventData: dataChangeAddressCustomer

  constructor(eventData: dataChangeAddressCustomer) {

    this.dataTimeOccurred = new Date();
    this.eventData = eventData
  }

  get dataAddress() {
    return this.eventData
  }

}