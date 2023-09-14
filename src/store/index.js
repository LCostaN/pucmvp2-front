import { reactive } from 'vue'
import { Order, OrderProduct, User } from '../models'

class StoreState {
  constructor({user, order}) {
    this.user = user ? new User(user.name, user.cep) : null,
    this.order = new Order(order?.id || 0, order?.user, order?.cep, order?.products)
  }
}

const DEFAULT_STORE_METHODS = {
  setUser(val) {
    this.user = val
    this.order.setUser(val)
    saveStoreState()
  },

  setProductToOrder(product, quantity) {
    const { id, weight } = product
    this.order.setOrderProduct(new OrderProduct(id, quantity, weight))
  },
  resetOrder() {
    this.order = new Order(0, this.user)
  }
}

function saveStoreState() {
  localStorage.setItem('store', JSON.stringify(store))
}

function loadStoreState() {
  const loadedState = localStorage.getItem('store')
  const state = loadedState ? JSON.parse(loadedState) : {}
  return new StoreState(state)
}

const store = reactive({ ...loadStoreState(), ...DEFAULT_STORE_METHODS })

export default store
