/// This is specifically how the products goes inside Order class.
/// This is to differentiate from Product class which is a product itself.
/// This has quantiy instead of stock and no description or name.
/// At least at the time of coding this, those attributes are not needed for order.
export default class OrderProduct {
  constructor(id, quantity, weight) {
    this.id = id
    this.quantity = quantity
    this.weight = weight
  }
}