import Product from "./product"

describe("Product unit tests", () => {

  it("should throw error when id is empty", () => {

    expect(() => {

      const product = new Product("", "Clean Code", 59.90)

    }).toThrowError("Id is required")
  })

  it("should throw error when name is empty", () => {

    expect(() => {

      const product = new Product("1", "", 59.90)

    }).toThrowError("Name is required")
  })

  it("should throw error when price as zero", () => {

    expect(() => {

      const product = new Product("1", "Clean Code", 0)

    }).toThrowError("Price cannot be zero")
  })

  it("should change name", () => {

    let product = new Product("1", "Clean Code", 59.90)
    product.changeName("Código Limpo")

    expect(product.name).toBe("Código Limpo")
  })

  it("should change price", () => {

    let product = new Product("1", "Clean Code", 59.90)
    product.changePrice(49.90)

    expect(product.price).toBe(49.90)
  })

})