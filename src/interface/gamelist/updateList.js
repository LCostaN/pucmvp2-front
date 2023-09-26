export default class UpdateGameListRequest {
  constructor(name, description, isPrivate, games) {
    this.name = name
    this.description = description
    this.is_private = isPrivate
    this.games = games
  }
}