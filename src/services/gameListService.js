import { GameList } from '../models'
import store from '../store'

const mockLists = [
  new GameList(1, 'Preferidos', 'Minha lista de preferidos', 'lnantes', [], true)
]

class GameListService {
  get(id) {
    return mockLists.find((gl) => gl.id == id)?.clone()
  }

  getAll() {
    return [...mockLists.filter((gl) => !gl.isPrivate || gl.user == store.user?.username)]
  }

  getMyLists() {
    return [...mockLists.filter((gl) => gl.user == store.user.username)]
  }

  createGameList(name, description, userId, isPrivate) {
    const index = (mockLists[mockLists.length - 1]?.id || 0) + 1
    mockLists.push(new GameList(index, name, description, userId, [], isPrivate))
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
