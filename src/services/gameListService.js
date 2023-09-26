import store from '../store'
import { CreateGameListRequest, UpdateGameListRequest } from '../interface/gamelist'

const LIST_API = import.meta.env.VITE_LIST_API_URL || 'http://localhost:5001/list/'

class GameListService {
  async _response(response) {
    const parsed = await response.json()
    if(response.status != 200) throw new Error(parsed.message)

    return parsed
  }
  _getHeader() {
    const header = {
      'Content-Type': 'application/json'
    }

    if (store.user?.token) {
      header['Authorization'] = `Bearer ${store.user.token}`
    }

    return header
  }

  async get(id) {
    const response = await fetch(LIST_API + id, {
      headers: this._getHeader()
    })

    return this._response(response)
  }

  async getAll() {
    const response = await fetch(LIST_API, {
      headers: this._getHeader()
    })

    return this._response(response)
  }

  async getMyLists() {
    if (!store.user) return []

    const response = await fetch(LIST_API + 'me', {
      headers: this._getHeader()
    })

    return this._response(response)
  }

  async createGameList(name, description, isPrivate) {
    if (!store.user) return undefined

    const data = new CreateGameListRequest(name, description, isPrivate)

    const response = await fetch(LIST_API, {
      method: 'POST',
      headers: this._getHeader(),
      body: JSON.stringify(data)
    })

    return this._response(response)
  }

  async updateGameList(gameList) {
    if (!store.user) return undefined

    const data = new UpdateGameListRequest(
      gameList.name,
      gameList.description,
      gameList.isPrivate,
      gameList.games
    )

    const response = await fetch(LIST_API + gameList.id, {
      method: 'PUT',
      headers: this._getHeader(),
      body: JSON.stringify(data)
    })

    return this._response(response)
  }

  async deleteGameList(id) {
    if (!store.user) return undefined

    const response = await fetch(LIST_API + id, {
      method: 'DELETE',
      headers: this._getHeader(),
    })

    return this._response(response)
  }
}

const gameListService = new GameListService()
export default gameListService
