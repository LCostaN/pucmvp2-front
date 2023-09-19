import { reactive } from 'vue'
import { GameList, User } from '../models'

// Creating a specialized class so we can use a local storage as a "session saver"
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

  updateList(gameList) {
    store.lists.find((l) => l.id == gameList.id)
    store.saveStoreState()
  }

  removeList(id) {
    this.lists = this.lists.filter((gl) => gl.id != id)
    this.saveStoreState()
  }

  addGameToList(listId, game) {
    const index = this.lists.findIndex((l) => l.id == listId)
    this.lists[index].setGameToList(game)
    this.saveStoreState()
  }

  removeGameFromList(listId, game) {
    const index = this.lists.findIndex((l) => l.id == listId)
    this.lists[index].remove(game)
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
