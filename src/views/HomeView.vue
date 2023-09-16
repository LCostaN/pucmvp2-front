<script setup>
import { ref, reactive, onMounted } from 'vue'

import GameCardComponent from '../components/GameCardComponent.vue'
import ImagePreviewComponent from '../components/ImagePreviewComponent.vue'
import { gameService } from '../services'

const filters = reactive({})
const games = ref([])
const selectedImage = ref(null)
const scroll = ref(0)

async function getGames() {
  try {
    games.value = await gameService.get(filters)
  } catch (e) {
    games.value = []
    console.log(e)
  }
}

function selectImage(val) {
  selectedImage.value = val
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
    <div class="games-wrapper" v-if="games.length > 0">
      <GameCardComponent
        :key="item"
        v-for="item in games"
        :game="item"
        @selectImage="selectImage"
      />
    </div>
    <div class="no-games" v-else>Nenhum jogo disponível no momento</div>
    <ImagePreviewComponent
      v-show="selectedImage"
      :src="selectedImage"
      @close="selectedImage = null"
    />
    <button class="scroll-top-button" v-show="scroll > 20" @click="scrollToTop">
      <font-awesome-icon :icon="['fas', 'arrow-up']" />
    </button>
  </main>
</template>

<style>
#home {
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

.games-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-auto-rows: 300px;
  gap: 20px;
  justify-content: center;
}

.no-games {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 2px 2px 5px black;
}
</style>
