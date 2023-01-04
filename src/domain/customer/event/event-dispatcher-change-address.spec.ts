import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../entity/value-object/address";
import CustomerChangeAddressEvent from "./customer-change-address-event";
import SendMessageWhenChangeAddressEvent from "./handler/send-message-when-change-address-event";


describe("Domain events tests change address customer", () => {

  it("should notify when event handler change address", async () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandlerChangeAddress = new SendMessageWhenChangeAddressEvent();
    const spyEventHandlerChangeAddress = jest.spyOn(eventHandlerChangeAddress, "handle")

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandlerChangeAddress)

    const customer = new Customer("1", "Lucian Tavares")
    const address = new Address("Rua 123", 99, "88888-888", "Criciúma")
    customer.Address = address

    const customerChangeAddressEvent = new CustomerChangeAddressEvent({
      id: customer.id,
      name: customer.name,
      address: address
    })

    eventDispatcher.notify(customerChangeAddressEvent)

    expect(spyEventHandlerChangeAddress).toHaveBeenCalled()
  })
})