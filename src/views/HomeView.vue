<script setup>
import { ref, onMounted, computed } from 'vue'

import SearchInputComponent from '../components/SearchInputComponent.vue'
import ListOfGamesComponent from '../components/ListOfGamesComponent.vue'
import FloatingButton from '../components/FloatingButton.vue'
import { gameService } from '../services'

const games = ref([])
const filter = ref('')

const display = computed(() =>
  games.value.filter(
    (g) =>
      g.title.toLowerCase().includes(filter.value.toLowerCase()) ||
      g.genre.toLowerCase().includes(filter.value.toLowerCase()) ||
      g.short_description.toLowerCase().includes(filter.value.toLowerCase()) ||
      g.publisher.toLowerCase().includes(filter.value.toLowerCase())
  )
)

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
  document.getElementById('home').scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function onScroll(event) {
  scroll.value = event.target.scrollTop
}

onMounted(getGames)
</script>

<template>
  <main id="home" @scroll="onScroll">
    <SearchInputComponent :value="filter" @change="filter = $event" />
    <ListOfGamesComponent :games="display" />
    <FloatingButton v-show="scroll > 20" @click="scrollToTop">
      <font-awesome-icon :icon="['fas', 'arrow-up']" />
    </FloatingButton>
  </main>
</template>

<style>
#home {
  padding: 12px 12px 90px 12px;
  height: 100vh;
  
  overflow-x: hidden;
  overflow-y: auto;
}

.games-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-auto-rows: 300px;
  gap: 20px;
  justify-content: center;
}
</style>
