<script setup>
import { ref } from 'vue'
import GameCardComponent from './GameCardComponent.vue'
import ImagePreviewComponent from './ImagePreviewComponent.vue';

defineProps({ games: Array })

const selectedImage = ref(null)

function selectImage(val) {
  selectedImage.value = val
}
</script>

<template>
  <div class="games-wrapper" v-if="games.length > 0">
    <GameCardComponent
      :key="item.id"
      v-for="item in games"
      :game="item"
      @remove="$emit('remove', item.id)"
      @selectImage="selectImage"
    />
  </div>
  <div class="card" v-else>Nenhum jogo encontrado</div>
  <ImagePreviewComponent
    v-show="selectedImage"
    :src="selectedImage"
    @close="selectedImage = null"
  />
</template>

<style scoped>
.games-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-auto-rows: 300px;
  gap: 20px;
  justify-content: center;
}
</style>
