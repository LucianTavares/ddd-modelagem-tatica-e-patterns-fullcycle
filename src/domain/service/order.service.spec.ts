import Customer from "../entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe("Order service unit tests", () => {

  it("should place an order", () => {

    const customer = new Customer("1", "Lucian Tavares")
    const item1 = new OrderItem("1", "1", "Clean Code", 59.90, 2)

    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(59.90)
    expect(order.total()).toBe(119.80)
  })

  it("should get total of all orders", () => {

    const item1 = new OrderItem("1", "1", "Clean Code", 59.90, 2)
    const item2 = new OrderItem("2", "2", "DDD", 89.90, 1)
    const order1 = new Order("1", "1", [item1])
    const order2 = new Order("2", "1", [item2])

    const total = OrderService.total([order1, order2])

    expect(total).toBe(209.70)

  })

})