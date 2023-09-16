<script setup>
import { ref } from 'vue'

import store from '../store'
import { User } from '../models'

const user = ref(store.user || new User(0))
const pass = ref('')

function save() {
  store.setUser(user)
}

function register() {}

function updateLogin() {}
</script>

<template>
  <main>
    <input v-model="user.name" placeholder="Nome" />
    <input v-model="user.email" placeholder="E-mail" />
    <input type="password" v-model="pass" placeholder="Senha" />
    <button @click="save">Salvar</button>
  </main>
</template>

<style scoped></style>
