<script setup>
import { ref } from 'vue'
import { vMaska } from "maska"
import store from '../store'
import { User } from '../models'

const user = ref(store.user || new User())

function save() {
  store.setUser(user)
}
</script>

<template>
  <main>
    <input v-model="user.name" placeholder="Nome" />
    <input v-maska data-maska="#####-###" v-model="user.cep" placeholder="CEP" />
    <button @click="save">Salvar</button>
  </main>
</template>

<style scoped></style>
