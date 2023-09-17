import { Game } from '.'

export default class GameList {
  constructor(id, name, description, user, games, isPrivate, tags, created, updated) {
    this.id = id
    this.name = name
    this.description = description
    this.user = user
    this.games = (games || []).map((g) => Game.fromJson(g))
    this.isPrivate = isPrivate || false
    this.tags = tags || []
    this.created = created || new Date()
    this.updated = updated || created || new Date()
  }

  static fromJson({ id, name, description, user, games, isPrivate, tags, created, updated }) {
    return new GameList(id, name, description, user, games, isPrivate, tags, created, updated)
  }

  setGameToList(game) {
    game = Game.fromJson(game)
    const index = this.games.findIndex((op) => op.id == game.id)
    if (index == -1) this.products.push(game)
  }

  remove(game) {
    const index = this.games.findIndex((op) => op.id == game.id)
    this.games.splice(index, 1)
  }
}
