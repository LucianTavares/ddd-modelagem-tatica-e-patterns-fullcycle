import Order from "./order"
import OrderItem from "./order_item"

describe("Order unit tests", () => {

  it("should throw error when id is empty", () => {

    expect(() => {
      let order = new Order("", "1", [])
    }).toThrowError("Id is required")
  })

  it("should throw error when customerId is empty", () => {

    expect(() => {
      let order = new Order("1", "", [])
    }).toThrowError("CustomerId is required")
  })

  it("should throw error when item is empty", () => {
    expect(() => {
      let order = new Order("1", "1", [])
    }).toThrowError("Item are required")
  })

  it("should calculate total", () => {

    const item1 = new OrderItem("1", "1", "Clean Code", 59.90, 2)
    const item2 = new OrderItem("2", "2", "DDD", 89.90, 1)
    const order = new Order("1", "1", [item1])

    let total = order.total();

    expect(total).toBe(119.80)

    const order2 = new Order("1", "1", [item1, item2])
    total = order2.total();    

    expect(total).toBe(209.70)
  })

  it("should throw error if the item quantity is is less or equal zero", () => {

    expect(() => {
      const item1 = new OrderItem("1", "1", "Clean Code", 59.90, 0)
      const order = new Order("1", "1", [item1])
    }).toThrowError("Item quantity must be greater than zero")

  })

})