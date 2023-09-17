export default class User {
  constructor(id, username) {
    this.id = id
    this.username = username
  }

  static fromJson({id, username}) {
    return new User(id, username)
  }

  clone() {
    return new User(this.id, this.username)
  }
}