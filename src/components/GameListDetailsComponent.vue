<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

import SearchInputComponent from './SearchInputComponent.vue'
import ListOfGamesComponent from './ListOfGamesComponent.vue'
import FloatingButton from './FloatingButton.vue'

import store from '../store'
import { GameList } from '../models'
import { gameListService, gameService } from '../services'

const router = useRouter()

const props = defineProps({ list: GameList })
const list = ref(props.list)
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
  document.getElementById('gamelistview').scrollTo({
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
  if (list.value?.user == store.user.username) {
    gameListService.updateGameList(list.value).then(() => store.updateList(list.value))
  }
}

function deleteList() {
  if (confirm('Deseja apagar permanentemente a lista ' + list.value.name + '?')) {
    gameListService.deleteGameList(list.value.id)
    store.removeList(list.value.id)
    list.value == null
    router.go(-1)
  }
}

onMounted(initialLoading)
onBeforeUnmount(saveList)
</script>

<template>
  <div id="gamelistview" @scroll="onScroll">
    <table class="lists-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>{{ store.user?.username == list.user ? 'Pública' : 'Autor' }}</th>
          <th>Tags</th>
          <th width="24">Jogos</th>
          <th v-if="store.user?.username == list.user" width="1" style="background-color: red">
            Excluir?
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="store.user?.username == list.user">
          <td class="input-cell" style="width: 33%"><input v-model="list.name" /></td>
          <td class="input-cell" style="width: 66%"><input v-model="list.description" /></td>
          <td class="center clickable" @click="list.isPrivate = !list.isPrivate">
            <font-awesome-icon
              :icon="!list.isPrivate ? ['fas', 'square-check'] : ['far', 'square']"
              :style="{ color: !list.isPrivate ? 'green' : 'var(--color-button)' }"
            />
          </td>
          <td class="no-wrap center">
            {{ list.tags.slice(0, 3).join(', ') }}
          </td>
          <td class="center">{{ list.games.length }}</td>
          <td class="center clickable" @click="deleteList">
            <font-awesome-icon :icon="['fas', 'trash']" style="color: red" />
          </td>
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
    <SearchInputComponent :value="filter" @change="filter = $event" />
    <h3>Meus jogos</h3>
    <ListOfGamesComponent :games="display1" :list="list" />
    <h3>Jogos não adicionados</h3>
    <ListOfGamesComponent :games="display2" :list="list" />
    <FloatingButton v-show="scroll > 20" @click="scrollToTop">
      <font-awesome-icon :icon="['fas', 'arrow-up']" />
    </FloatingButton>
  </div>
</template>

<style scoped>
#gamelistview {
  height: 100vh;
  padding: 20px 20px 90px 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

.lists-table {
  margin-bottom: 12px;
}

input {
  width: 100%;
  padding: 4px;
}

h3 {
  padding-left: 10px;
  margin-bottom: 12px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: linear-gradient(to right, #ffffffc5, transparent);
  border-color: var(--color-button);
  color: var(--color-button);
}

h3:last-of-type {
  margin-top: 20px;
}
</style>
