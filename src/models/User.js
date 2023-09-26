export default class User {
  constructor(token, username) {
    this.token = token
    this.username = username
  }

  static fromJson({token, username}) {
    return new User(token, username)
  }
}