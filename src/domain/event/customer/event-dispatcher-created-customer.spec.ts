import CustomerCreatedEvent from "./customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler from "./handler/send-email-when-customer-is-created.handler";
import SendMessageWhenCustomerIsCreatedHandler from "./handler/send-message-when-customer-is-created.handler";
import EventDispatcher from "../@shared/event-dispatcher"

describe("Domain events tests created customer", () => {

  it("should register an event handler of a customer", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new SendMessageWhenCustomerIsCreatedHandler();
    const eventHandlerSecond = new SendEmailWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerFirst)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSecond)
  })

  it("should unregister an event handler of a customer", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new SendMessageWhenCustomerIsCreatedHandler();
    const eventHandlerSecond = new SendEmailWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerFirst)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSecond)

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerFirst)
    eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerSecond)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0)
  })

  it("should unregister all events handler a customers", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new SendMessageWhenCustomerIsCreatedHandler();
    const eventHandlerSecond = new SendEmailWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerFirst)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSecond)

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
  })

  it("should notify all events handlers a customers", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new SendMessageWhenCustomerIsCreatedHandler();
    const eventHandlerSecond = new SendEmailWhenCustomerIsCreatedHandler();
    const spyEventsHandlerFirst = jest.spyOn(eventHandlerFirst, "handle")
    const spyEventsHandlerSecond = jest.spyOn(eventHandlerSecond, "handle")

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerFirst)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSecond)

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Lucian Tavares",
      street: "Rua 123",
      number: 99,
      zipcode: "88888-888",
      city: "Criciúma",
    })

    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEventsHandlerFirst).toHaveBeenCalled()
    expect(spyEventsHandlerSecond).toHaveBeenCalled()
  })
})