<script setup>
import { Game } from '../models'

const props = defineProps({ game: Game })

function openWebsite() {
  window.open(props.game.game_url)
}
</script>

<template>
  <div class="game-card">
    <img :src="game.thumbnail" :alt="game.title" @click="$emit('selectImage', game.thumbnail)" />
    <div class="game-description">
      <b>{{ game.title }}</b> <br />
      {{ game.short_description }}
    </div>
    <div class="game-specification">
      <b>{{ game.genre }}</b> <br/>
      <b>{{ game.publisher }}</b>
    </div>
    <div class="game-card-footer">
      <div><b>{{ game.platform }}</b></div>
      <button class="website-button" @click="openWebsite">
        Visitar <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.game-card {
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 2px 2px 10px black;
  transition: all 0.3s;
}
.game-card img {
  width: 100%;
  height: 50%;
  object-fit: fill;
}

.game-description,
.game-specification,
.game-card-footer {
  padding: 0 12px;
  line-height: 1.4;
  font-size: 12px;
}

.game-description b {
  font-size: 14px;
}

.game-description {
  height: 70px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

b {
  border-bottom: solid 2px grey;
}

.game-specification {
  flex: 1;
  margin-bottom: 4px;
}

.game-card-footer {
  display: flex;
  justify-content: space-between;
  height: 24px;
  margin-bottom: 12px;
}

.website-button {
  background-color: var(--color-button);
  border: #25a solid 1px;
  box-shadow: 0px 0px 4px black;
  color: white;
  padding: 0 12px;
  transition: all 0.3s;
}

.website-button:hover {
  transform: scale(1.1);
}
</style>
