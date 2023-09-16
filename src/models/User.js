export default class User {
  constructor(id, name, title) {
    this.id = id
    this.name = name
    this.title = title
  }

  static fromJson({id, name, title}) {
    return new User(id, name, title)
  }
}