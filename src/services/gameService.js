import { Game } from '../models'

const SERVICE_URL = `https://free-to-play-games-database.p.rapidapi.com/api/games`

let games = []

class GameService {
  async get() {
    if (games.length > 0) return games

    const response = await fetch(SERVICE_URL, {
      headers: {
        'X-RapidAPI-Key': '156e945590msh220be195af5fbf8p16a13djsn7fac25f59752',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    })
    games = JSON.parse(await response.text()).map((g) => Game.fromJson(g))

    return games
  }
}

const gameService = new GameService()
export default gameService
