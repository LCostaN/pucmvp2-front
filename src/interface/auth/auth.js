export default class AuthRequest {
  constructor(username, password) {
    this.username = (username || '').toLowerCase()
    this.password = password
  }
}