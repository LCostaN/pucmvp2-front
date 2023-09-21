<script setup>
import { ref } from 'vue'

import store from '../store'
import { User } from '../models'
import { userService, gameListService } from '../services'

const username = ref(store.user?.username)
const pass = ref(null)
const isRegister = ref(!store.user)

function register() {
  const result = userService.register(username.value, pass.value)

  if (result < 0) {
    console.log(`Error code: ${result}`)
    return
  }

  store.setUser(new User(result, username.value))
}

async function login() {
  const result = await userService.login(username.value, pass.value)

  if (typeof result == 'number') {
    console.log(`Error code: ${result}`)
    return
  }

  store.setUser(result)

  const myLists = await gameListService.getMyLists()
  store.setLists(myLists)
}
</script>

<template>
  <div class="card auth-wrapper">
    <div class="register-wrapper">
      <b>{{ isRegister ? 'Cadastrar' : 'Entrar' }}</b>
      <div>
        <input v-model="username" placeholder="Login" />
        <input type="password" v-model="pass" placeholder="Senha" />
        <button class="submit-button" @click="isRegister ? register() : login()">
          {{ isRegister ? 'Cadastrar' : 'Entrar' }}
        </button>
      </div>
      <a class="auth-toggle" @click="isRegister = !isRegister">
        {{ isRegister ? 'Já possuo conta' : 'Não possuo conta' }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
.register-wrapper > b {
  width: 100px;
}

.register-wrapper > div {
  flex: 1;
  text-align: center;
}

.auth-toggle {
  width: 135px;
  color: var(--color-button);
  text-decoration: underline;
  text-align: center;
  cursor: pointer;
}

.auth-toggle:hover {
  color: blue;
  background-color: #44444410;
}

input {
  padding: 4px 8px;
  border-radius: 0px;
  border-width: 1px;
  outline: 0;
}

.submit-button {
  width: 100px;
  color: white;
  background-color: var(--color-button);
  border: solid 1px var(--color-button);
  padding: 4px;
}
</style>
