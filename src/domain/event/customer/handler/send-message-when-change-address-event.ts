import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address-event";

export default class SendMessageWhenChangeAddressEvent implements EventHandlerInterface<CustomerChangeAddressEvent> {

  handle(event: CustomerChangeAddressEvent): void {
    
    let {id, name, address} = event.dataAddress
    
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address.toString()}`)
  }

}