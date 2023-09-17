import { auth } from '../interface'
import { User } from '../models'

const mockAuth = []
const mockUsers = []

class UserService {
  login(username, pass) {
    username = (username || '').toLowerCase()
    const testUser = mockAuth.findIndex((a) => a.username == username)

    if (testUser == -1) return -1
    if (mockAuth[testUser].pass != pass) return -2

    return mockUsers.find((u) => u.username == username)
  }

  register(username, pass) {
    username = (username || '').toLowerCase()
    if ((pass || '').length < 4) return -1
    if (username.length < 3) return -2
    if (mockUsers.findIndex((u) => u.username.toLowerCase() == username) > -1) return -3

    mockAuth.push(new auth.RegisterRequest(username, pass))

    const index = (mockUsers[mockUsers.length - 1]?.id || 0) + 1
    mockUsers.push(new User(index, username))
    return index
  }

  updateUser(user) {
    const index = mockUsers.findIndex((e) => e.id == user.id)
    mockUsers[index] = user
  }

  deleteUser(id) {
    const index = mockUsers.findIndex((e) => e.id == id)
    mockUsers.splice(index, 1)
  }
}

const userService = new UserService()
export default userService
