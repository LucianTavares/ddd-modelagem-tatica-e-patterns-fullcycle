import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address"
import Customer from "../../domain/entity/customer"
import Order from "../../domain/entity/order"
import OrderItem from "../../domain/entity/order_item"
import Product from "../../domain/entity/product"
import CustomerModel from "../db/sequelize/model/customer.model"
import OrderItemModel from "../db/sequelize/model/order-item.model"
import OrderModel from "../db/sequelize/model/order.model"
import ProductModel from "../db/sequelize/model/product.model"
import CustomerRepository from "./customer.repository"
import OrderRepository from "./order.repository"
import ProductRepository from "./product.repository"

describe("Order repository tests", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "Lucian Tavares")
    const address = new Address("Rua 123", 99, "88888-888", "Criciúma")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("1", "DDD", 59.90)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    )

    const order = new Order("1", "1", [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "1",
          product_id: "1"
        }
      ]
    })
  })

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Lucian Tavares");
    const address = new Address("Rua 123", 99, "888888-888", "Criciúma");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "DDD", 55.90);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("1", "1", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    let createdOrder = await orderRepository.find("1");

    const product2 = new Product("2", "Clean Code", 89.90);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.id,
      product2.name,
      product2.price,
      1
    );

    createdOrder.items.push(orderItem2);

    await orderRepository.update(createdOrder);

    const orderModel = await OrderModel.findOne({
      where: { id: createdOrder.id },
      include: ["items"],
    });

    expect(orderModel.items).toHaveLength(2);

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: createdOrder.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: product2.id,
        }
      ],
    });    
  });

  it("should find a order by Id", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "Lucian Tavares")
    const address = new Address("Rua 123", 99, "88888-888", "Criciúma")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("1", "DDD", 59.90)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    )

    const order = new Order("1", "1", [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    })

    const foundOrder = await orderRepository.find(order.id)

    expect(orderModel.toJSON()).toStrictEqual({
      id: foundOrder.id,
      customer_id: foundOrder.customerId,
      total: foundOrder.total(),
      items: [
        {
          id: orderItem.id,
          product_id: orderItem.productId,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "1",
        }
      ]
    })
  })

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("1", "Lucian Tavares")
    const address = new Address("Rua 123", 99, "88888-888", "Crticiúma")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("1", "DDD", 59.90)
    const product2 = new Product("2", "Clean Code", 89.90)
    await productRepository.create(product)
    await productRepository.create(product2)

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    )
    const orderItem2 = new OrderItem(
      "2",
      product2.id,
      product2.name,
      product2.price,
      3
    )
    
    const order = new Order("1", "1", [orderItem])
    const order2 = new Order("2", "1", [orderItem2])

    const orderRepository = new OrderRepository()

    await orderRepository.create(order)
    await orderRepository.create(order2)

    const orders = [order, order2]

    const foundOrders = await OrderModel.findAll({
      include: ["items"]
    })

    expect(foundOrders.map((order) => order.toJSON())).toStrictEqual([
      {
        id: order.id,
        customer_id: order.customerId,
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            order_id: order.id,
            product_id: product.id
          }
        ]
      },
      {
        id: order2.id,
        customer_id: order2.customerId,
        total: order2.total(),
        items: [
          {
            id: orderItem2.id,
            name: orderItem2.name,
            price: orderItem2.price,
            quantity: orderItem2.quantity,
            order_id: order2.id,
            product_id: product2.id
          }
        ]
      }
    ])

  })
})