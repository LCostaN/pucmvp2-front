<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

import ListOfGamesComponent from '../components/ListOfGamesComponent.vue'
import FloatingButton from '../components/FloatingButton.vue'
import { gameService } from '../services'
import store from '../store'

const route = useRoute()

const list = ref(store.lists.find((l) => l.id == route.params.id))
const games = ref([])

const filter = ref('')
const display1 = computed(() => list.value.games)
const display2 = computed(() => games.value)

const scroll = ref(0)

async function getGames() {
  try {
    games.value = await gameService.get()
  } catch (e) {
    games.value = []
    console.log(e)
  }
}

function scrollToTop() {
  document.getElementById('gamelist').scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function onScroll(event) {
  scroll.value = event.target.scrollTop
}

function addToList(id) {
  list.value.games.push(games.value.find((g) => g.id == id))
}

function removeFromList(id) {
  const index = list.value.games.findIndex((g) => g.id == id)
  list.value.games.splice(index, 1)
}

onMounted(getGames)
</script>

<template>
  <main id="gamelist" @scroll="onScroll">
    <ListOfGamesComponent @remove="removeFromList" :games="display1" />
    <ListOfGamesComponent @add="addToList" :games="display2" />
    <FloatingButton :show="scroll > 20" @click="scrollToTop">
      <font-awesome-icon :icon="['fas', 'arrow-up']" />
    </FloatingButton>
  </main>
</template>

<style>
#gamelist {
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
</style>
