<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import store from '../store'
import { gameListService } from '../services'
import { GameList } from '../models'

const router = useRouter()

const name = ref('')
const description = ref('')
const isPrivate = ref(true)

async function createList() {
  const id = await gameListService.createGameList(
    name.value,
    description.value,
    store.user.id,
    isPrivate.value
  )

  const newList = new GameList(
    id,
    name.value,
    description.value,
    store.user.username,
    [],
    isPrivate.value
  )
  store.addList(newList)
  router.replace(`/lists/${id}`)
}

if (!store.user) useRouter().go('/profile')
</script>

<template>
  <main id="newlist">
    <table class="lists-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Pública</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="input-cell" style="width: 33%"><input v-model="name" /></td>
          <td class="input-cell" style="width: 66%"><input v-model="description" /></td>
          <td class="center clickable" @click="isPrivate = !isPrivate">
            <font-awesome-icon
              :icon="['fas', isPrivate ? 'square-check' : 'square']"
              :style="{ color: isPrivate ? 'green' : 'var(--color-button)' }"
              size="xl"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="add-list-button-wrapper">
      <button class="add-list-button" @click="createList">
        <font-awesome-icon
          :icon="['fas', 'circle-check']"
          style="color: white; padding-right: 4px"
        />
        Salvar
      </button>
    </div>
  </main>
</template>

<style>
#newlist {
  padding: 12px 12px 90px 12px;
  height: 100vh;
  background: linear-gradient(
    225deg,
    grey,
    darkgrey,
    grey,
    darkgrey,
    grey,
    darkgrey,
    grey,
    darkgrey,
    grey,
    darkgrey
  );
  overflow-x: hidden;
  overflow-y: auto;
}

.add-list-button-wrapper {
  display: flex;
  justify-content: end;
}

.add-list-button {
  cursor: pointer;
  padding: 8px 30px;
  border: 0;
  border-radius: 2px;
  background-color: green;
  color: white;
  box-shadow: 1px 1px 3px black;
}
</style>
