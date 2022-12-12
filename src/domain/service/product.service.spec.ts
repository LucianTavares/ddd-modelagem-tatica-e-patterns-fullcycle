
import Product from "../entity/product"
import ProductService from "./product.service"

describe("Product Service unit tests", () => {

  it("should change the prices of all products", () => {

    const product1 = new Product("1", "Clean Code", 59.90)
    const product2 = new Product("2", "DDD", 89.90)
    const products = [product1, product2]

    ProductService.increasePrice(products, 10)

    expect(product1.price).toBe(65.89)
    expect(product2.price).toBe(98.89)

  })
})