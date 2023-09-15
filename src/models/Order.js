import { OrderProduct } from './'

export default class Order {
  constructor(id, user, cep, products, shipOption) {
    this.id = id
    this.user = user
    this.cep = cep || user?.cep || ''
    this.products = products || []
    this.date = new Date()
    this.shipOption = shipOption
  }

  setUser(user) {
    this.user = user
    this.cep = user.cep
  }

  setOrderProduct(orderProduct) {
    orderProduct = OrderProduct.fromObject(orderProduct)
    const index = this.products.findIndex((op) => op.id == orderProduct.id)
    if(index == -1) this.products.push(orderProduct)
    else this.products[index] = orderProduct
  }

  remove(orderProduct) {
    const index = this.products.findIndex((op) => op.id == orderProduct.id)
    this.products.splice(index, 1)
  }
}