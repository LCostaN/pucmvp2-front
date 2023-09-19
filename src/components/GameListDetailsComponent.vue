<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import ListOfGamesComponent from './ListOfGamesComponent.vue'
import FloatingButton from './FloatingButton.vue'

import store from '../store'
import { GameList } from '../models'
import { gameListService, gameService } from '../services'

const props = defineProps({ list: GameList })
const list = ref(props.list.clone())
const scroll = ref(0)
const games = ref([])

const filter = ref('')
const display1 = computed(() =>
  list.value.games.filter(
    (g) =>
      g.title.toLowerCase().includes(filter.value.toLowerCase()) ||
      g.genre.toLowerCase().includes(filter.value.toLowerCase()) ||
      g.short_description.toLowerCase().includes(filter.value.toLowerCase())
  )
)

const display2 = computed(() =>
  games.value
    .filter((g1) => list.value.games.findIndex((g2) => g1.id == g2.id) == -1)
    .filter(
      (g) =>
        g.title.toLowerCase().includes(filter.value.toLowerCase()) ||
        g.genre.toLowerCase().includes(filter.value.toLowerCase()) ||
        g.short_description.toLowerCase().includes(filter.value.toLowerCase())
    )
)

function scrollToTop() {
  document.getElementById('gamelist').scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function onScroll(event) {
  scroll.value = event.target.scrollTop
}

async function loadGames() {
  try {
    games.value = await gameService.get()
  } catch (e) {
    games.value = []
    console.error('LOAD GAMES FAIL', e)
  }
}

async function initialLoading() {
  await loadGames()
}

function saveList() {
  gameListService.updateGameList(list.value)
  store.updateList(list.value)
}

onMounted(initialLoading)
onBeforeUnmount(saveList)
</script>

<template>
  <main id="gamelist" @scroll="onScroll">
    <table class="lists-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>{{ store.user?.username == list.user ? 'Pública' : 'Autor' }}</th>
          <th>Tags</th>
          <th width="24">Jogos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="store.user?.username == list.user">
          <td class="input-cell" style="width: 33%"><input v-model="list.name" /></td>
          <td class="input-cell" style="width: 66%"><input v-model="list.description" /></td>
          <td class="center clickable" @click="list.isPrivate = !list.isPrivate">
            <font-awesome-icon
              v-if="!list.isPrivate"
              :icon="['fas', 'circle-check']"
              style="color: green"
            />
          </td>
          <td class="no-wrap center">
            {{ list.tags.slice(0, 3).join(', ') }}
          </td>
          <td class="center">{{ list.games.length }}</td>
        </tr>
        <tr v-else>
          <td>{{ list.name }}</td>
          <td>{{ list.description }}</td>
          <td class="center">{{ list.user }}</td>
          <td class="center no-wrap">{{ list.tags.join(', ') || '-' }}</td>
          <td class="center">{{ list.games.length }}</td>
        </tr>
      </tbody>
    </table>
    <div class="search-input-control">
      <font-awesome-icon class="search-icon" :icon="['fas', 'magnifying-glass']" />
      <input class="search-input" v-model="filter" />
    </div>
    <h3>Meus jogos</h3>
    <ListOfGamesComponent :games="display1" :list="list" />
    <h3>Jogos não adicionados</h3>
    <ListOfGamesComponent :games="display2" :list="list" />
    <FloatingButton v-show="scroll > 20" @click="scrollToTop">
      <font-awesome-icon :icon="['fas', 'arrow-up']" />
    </FloatingButton>
  </main>
</template>
