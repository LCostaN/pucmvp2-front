import { Game } from '.'

export default class GameList {
  constructor(id, name, description, user, games, isPrivate, created, updated) {
    this.id = id
    this.name = name
    this.description = description
    this.user = user
    this.games = (games || []).map((g) => Game.fromJson(g))
    this.isPrivate = isPrivate || false
    this.created = created || new Date()
    this.updated = updated || created || new Date()
  }

  static fromJson({ id, name, description, user, games, isPrivate, created, updated }) {
    return new GameList(id, name, description, user, games, isPrivate, created, updated)
  }

  get tags() {
    return this.games.reduce(
      (tagTotal, game) =>
        (tagTotal = tagTotal.includes(game.genre) ? tagTotal : [...tagTotal, game.genre]),
      []
    )
  }

  setGameToList(game) {
    game = Game.fromJson(game)
    const index = this.games.findIndex((g) => g.id == game.id)
    if (index == -1) this.games.push(game)
  }

  remove(game) {
    const gameId = game?.id ?? game

    const index = this.games.findIndex((op) => op.id == gameId)

    this.games.splice(index, 1)
  }

  clone() {
    return new GameList(
      this.id,
      this.name,
      this.description,
      this.user,
      this.games,
      this.isPrivate,
      this.created,
      this.updated
    )
  }
}
