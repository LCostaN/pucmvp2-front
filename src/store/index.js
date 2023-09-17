import { reactive } from 'vue'
import { GameList, User } from '../models'

class StoreState {
  constructor({ user, lists }) {
    this.user = user ? User.fromJson(user) : null
    this.lists = (lists || []).map((gl) => GameList.fromJson(gl))
  }

  saveStoreState() {
    localStorage.setItem('store', JSON.stringify(store))
  }

  setUser(val) {
    this.user = val
    this.saveStoreState()
  }

  setLists(val) {
    this.lists = val
    this.saveStoreState()
  }

  addList(gameList) {
    this.lists.push(gameList)
    this.saveStoreState()
  }

  removeList(id) {
    this.lists = this.lists.filter((gl) => gl.id != id)
    this.saveStoreState()
  }

  reset() {
    this.user = null
    this.lists = []
    this.saveStoreState()
  }
}

function loadStoreState() {
  const loadedState = localStorage.getItem('store')
  const state = loadedState ? JSON.parse(loadedState) : {}
  return new StoreState(state)
}

const store = reactive(loadStoreState())

export default store
