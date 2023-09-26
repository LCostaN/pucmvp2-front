export default class CreateGameListRequest {
  constructor(name, description, isPrivate) {
    this.name = name
    this.description = description
    this.is_private = isPrivate
  }
}