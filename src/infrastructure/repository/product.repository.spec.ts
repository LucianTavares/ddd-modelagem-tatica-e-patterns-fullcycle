import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model"
import ProductRepository from "./product.repository"
import Product from "../../domain/product/entity/product"

describe("Product repository tests", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })
  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "DDD", 59.90)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: "1" } })
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "DDD",
      price: 59.90
    })
  })

  it("should update a product", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "DDD", 59.90)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: "1" } })
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "DDD",
      price: 59.90
    })

    product.changeName("Clean Code")
    product.changePrice(89.90)

    await productRepository.update(product)

    const productModel2 = await ProductModel.findOne({ where: { id: "1" } })
    expect(productModel2.toJSON()).toStrictEqual({
      id: "1",
      name: "Clean Code",
      price: 89.90
    })
  })

  it("should find a product", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "DDD", 59.90)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: "1" } })
    const foundProduct = await productRepository.find("1")

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    })
  })

  it("should find all products", async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product("1", "DDD", 59.90)
    await productRepository.create(product1)

    const product2 = new Product("2", "Clean Code", 89.90)
    await productRepository.create(product2)

    const foundProducts = await productRepository.findAll()
    const products = [product1, product2]

    expect(products).toEqual(foundProducts)
  })

})