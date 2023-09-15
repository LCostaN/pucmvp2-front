import { reactive } from 'vue'
import { Order, OrderProduct, User } from '../models'

function saveStoreState() {
  localStorage.setItem('store', JSON.stringify(store))
}

class StoreState {
  constructor({ user, order }) {
    this.user = user ? new User(user.name, user.cep) : null
    this.order = new Order(
      order?.id || 0,
      order?.user,
      order?.cep,
      order?.products?.map((p) => OrderProduct.fromObject(p))
    )
  }

  setUser(val) {
    this.user = val
    this.order.setUser(val)
    saveStoreState()
  }

  updateProductOrder(orderProduct) {
    if (orderProduct.quantity <= 0) this.order.remove(orderProduct)
    else this.order.setOrderProduct(orderProduct)
    saveStoreState()
  }

  resetOrder() {
    this.order = new Order(0, this.user)
    saveStoreState()
  }
}

function loadStoreState() {
  const loadedState = localStorage.getItem('store')
  const state = loadedState ? JSON.parse(loadedState) : {}
  return new StoreState(state)
}

const store = reactive(loadStoreState())

export default store
