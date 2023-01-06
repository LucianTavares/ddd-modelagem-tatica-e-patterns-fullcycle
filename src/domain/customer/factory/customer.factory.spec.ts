import Address from "../entity/value-object/address"
import CustomerFactory from "./customer.factory"

describe("Customer factory unit tests", () => {

  it("should create a customer", () => {

    let customer = CustomerFactory.create("Lucian")

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("Lucian")
    expect(customer.Address).toBeUndefined()

  })

  it("should create a customer with an address", () => {

    const address = new Address("Rua 123", 99, "888888-555", "Criciúma")
    let customer = CustomerFactory.createWithAddress("Lucian", address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("Lucian")
    expect(customer.Address).toBe(address)

  })

})