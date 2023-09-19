<script setup>
import { computed, ref } from 'vue'

import store from '../store'
import { Game, GameList } from '../models'

const props = defineProps({ game: Game, list: GameList })
const lists = ref(props.list ? [props.list] : [...store.lists])

const listAddDisplay = computed(() =>
  lists.value.filter((l) => l.games.findIndex((g) => g.id == props.game.id) == -1)
)

const listRemoveDisplay = computed(() =>
  lists.value.filter((l) => l.games.findIndex((g) => g.id == props.game.id) > -1)
)

function addToList(event) {
  store.addGameToList(event.target.value, props.game)

  event.target.selectedIndex = 0
}

function removeFromList(event) {
  store.removeGameFromList(event.target.value, props.game)

  event.target.selectedIndex = 0
}

function openWebsite() {
  window.open(props.game.game_url)
}
</script>

<template>
  <div class="game-card">
    <img
      class="zoomable"
      :src="game.thumbnail"
      :alt="game.title"
      @click="$emit('selectImage', game.thumbnail)"
    />
    <div class="game-description clickable" @click="openWebsite">
      <b>{{ game.title }}</b> <br />
      {{ game.short_description.substring(0, 70) }}
      {{ game.short_description.length > 70 ? ' ... ' : '' }}
      <div style="text-align: end"><u>Visit website</u></div>
    </div>
    <div class="game-specification">
      <b>{{ game.genre }}</b> <br />
      <b>{{ game.publisher }}</b>
    </div>
    <div class="game-card-footer" v-if="list">
      <button
        class="remove-from-list-button"
        @click="removeFromList"
        :value="list.id"
        v-if="listRemoveDisplay.length > 0"
      >
        Remove -
      </button>
      <div v-else></div>

      <button
        class="add-to-list-button"
        @click="addToList"
        :value="list.id"
        v-if="listAddDisplay.length > 0"
      >
        Add +
      </button>
    </div>

    <div class="game-card-footer" v-else>
      <select
        class="remove-from-list-button"
        @change="removeFromList"
        v-if="listRemoveDisplay.length > 0"
      >
        <option value="0" disabled hidden selected>Remove -</option>
        <option :key="list.id" v-for="list in listRemoveDisplay" :value="list.id">
          {{ list.name }}
        </option>
      </select>
      <div v-else></div>

      <select class="add-to-list-button" @change="addToList" v-if="listAddDisplay.length > 0">
        <option disabled hidden selected>Add +</option>
        <option :key="list.id" v-for="list in listAddDisplay" :value="list.id">
          {{ list.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.game-card {
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 10px black;
  transition: all 0.3s;
  overflow: visible;
}
.game-card img {
  width: 100%;
  height: 50%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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

.remove-from-list-button,
.add-to-list-button {
  box-shadow: 0px 0px 4px black;
  color: white;
  padding: 0 12px;
  transition: all 0.3s;
  text-align: center;
  appearance: none;
  -webkit-appearance: none;
}

.remove-from-list-button::-ms-expand,
.add-to-list-button::-ms-expand {
  display: none;
}

.add-to-list-button {
  background-color: green;
  border: green solid 1px;
}

.remove-from-list-button {
  background-color: red;
  border: red solid 1px;
}
</style>
