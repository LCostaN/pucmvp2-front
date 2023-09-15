/// This is specifically for the product inside Order class.
/// This is to differentiate from Product class which is the product itself.
/// This has quantiy instead of stock basically as other info are used in OrderView.
export default class OrderProduct {
  constructor(id, name, description, quantity, weight, image, price) {
    this.id = id
    this.name = name
    this.description = description
    this.quantity = quantity
    this.weight = weight
    this.image = image
    this.price = price
  }

  get total() {
    return this.price * this.quantity
  }

  static fromProduct(product) {
    return new OrderProduct(
      product.id,
      product.name,
      product.description,
      0,
      product.weight,
      product.image,
      product.price
    )
  }

  static fromObject(object) {
    return new OrderProduct(
      object.id,
      object.name,
      object.description,
      object.quantity,
      object.weight,
      object.image,
      object.price
    )
  }

  copy() {
    return new OrderProduct(
      this.id,
      this.name,
      this.description,
      this.quantity,
      this.weight,
      this.image,
      this.price
    )
  }
}
