import { GameList } from '../models'
import store from '../store'

const mockLists = [
  new GameList(1, 'Preferidos', 'Minha lista de preferidos', 1, 'Lucas', [], true, [])
]

class GameListService {
  getAll() {
    return [...mockLists]
  }

  getMyLists() {
    return [...mockLists.filter((gl) => gl.ownerId == store.user.id)]
  }

  createGameList(name, description, userId) {
    const index = mockLists.length
    mockLists.push(new GameList(index, name, description, userId))
    return index
  }

  updateGameList(gameList) {
    const index = mockLists.findIndex((e) => e.id == gameList.id)
    mockLists[index] = gameList
  }

  deleteGameList(id) {
    const index = mockLists.findIndex((e) => e.id == id)
    mockLists.splice(index, 1)
  }
}

const gameListService = new GameListService()
export default gameListService
