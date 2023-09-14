import { Order } from '../models'

const mockOrders = []

class OrderService {
  getOrders() {
    return [...mockOrders]
  }

  createOrder({ user, products }) {
    const index = mockOrders.length
    mockOrders.push(new Order(index, user, products))
    return index
  }

  updateOrder(order) {
    const index = mockOrders.findIndex((e) => e.id == order.id)
    mockOrders[index] = order
  }

  deleteOrder(id) {
    const index = mockOrders.findIndex((e) => e.id == id)
    mockOrders.splice(index, 1)
  }
}

const orderService = new OrderService()
export default orderService
