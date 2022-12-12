import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address"
import Customer from "../../domain/entity/customer"
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer.repository"

describe("Customer repository tests", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a repository", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "Lucian Tavares")
    const address = new Address("Rua 123", 99, "88888-888", "Criciúma")
    customer.Address = address
    
    await customerRepository.create(customer)
    
    const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city
    })
  })

  it("should update a repository", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "Lucian Tavares")
    const address = new Address("Rua 123", 99, "888888-888", "Criciúma")
    customer.Address = address

    await customerRepository.create(customer)

    customer.changeName("Lucian Silva")
    await customerRepository.update(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: "1" } })
    
    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city
    })
  })

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "Lucian Tavares")
    const address = new Address("Rua 123", 99, "88888-888", "Criciúma")
    customer.Address = address

    await customerRepository.create(customer)

    const customerResult = await customerRepository.find(customer.id)

    expect(customer).toStrictEqual(customerResult)
  })

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository()

    expect(async () => {
      await customerRepository.find("456ABC")
    }).rejects.toThrow("Customer not found")
  })

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = new Customer("1", "Lucian Tavares")
    const address1 = new Address("Rua 123", 99, "88888-888", "Criciúma")
    customer1.Address = address1
    customer1.addRewardPoints(50)
    customer1.activate()

    const customer2 = new Customer("2", "Lucian Silva")
    const address2 = new Address("Rua 321", 10, "88888-888", "Criciúma")
    customer2.Address = address2
    customer2.addRewardPoints(20)

    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const customers = await customerRepository.findAll()

    expect(customers).toHaveLength(2)
    expect(customers).toContainEqual(customer1)
    expect(customers).toContainEqual(customer2)

  })

})