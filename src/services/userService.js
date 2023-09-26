import { AuthRequest } from '../interface'

const USER_URL = 'http://localhost:5000/'

class UserService {
  async login(username, pass) {
    const data = new AuthRequest(username, pass)
    const response = await fetch(USER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const body = await response.json()

    return body
  }

  async register(username, pass) {
    const data = new AuthRequest(username, pass)
    const result = await fetch(USER_URL + 'new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const body = await result.json()

    return body
  }
}

const userService = new UserService()
export default userService
