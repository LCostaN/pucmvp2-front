import { reactive } from 'vue'
import { GameList, User } from '../models'

function saveStoreState() {
  localStorage.setItem('store', JSON.stringify(store))
}

class StoreState {
  constructor({ user, lists }) {
    this.user = user ? User.fromJson(user) : null
    this.lists = (lists || []).map((gl) => GameList.fromJson(gl || {}))
  }

  setUser(val) {
    this.user = val
    saveStoreState()
  }

  addList(gameList) {
    this.lists.push(gameList)
    saveStoreState()
  }

  removeList(id) {
    this.lists = this.lists.filter((gl) => gl.id != id)
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
