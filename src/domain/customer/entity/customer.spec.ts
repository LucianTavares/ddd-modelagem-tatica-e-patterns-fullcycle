import Address from "./value-object/address";
import Customer from "./customer"

describe("Customer unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Lucian");
    }).toThrowError("Id is required")
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("1", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Act
    const customer = new Customer("1", "Lucian");

    //Arrange 
    customer.changeName("Lucian Tavares");

    //Assert
    expect(customer.name).toBe("Lucian Tavares");
  });

  it("should activate customer", () => {

    const customer = new Customer("1", "Lucian");
    const address = new Address("Rua 23", 15, "88888-888", "Bauru");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);

  });

  it("should throw error when address is undefined when you activate a customer", () => {

    expect(() => {

      const customer = new Customer("1", "Lucian");
      customer.activate();
      
    }).toThrowError("Address is mandatory to activate a customer")

  });

  it("should deactivate customer", () => {

    const customer = new Customer("1", "Lucian");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {

    const customer = new Customer("1", "Lucian")
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(30)
    expect(customer.rewardPoints).toBe(30)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(40)

  })

});