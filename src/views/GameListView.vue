<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { gameListService } from '../services'
import store from '../store'
import NewGameListComponent from '../components/NewGameListComponent.vue';
import GameListDetailsComponent from '../components/GameListDetailsComponent.vue';

const route = useRoute()

const localList = computed(() => store.lists.find((l) => l.id == route.params?.id))
const list = ref(localList.value)

async function loadList() {
  try {
    if (!list.value) list.value = await gameListService.get(route.params.id)
  } catch (e) {
    console.error('LOAD LIST FAIL', e)
  }
}

async function initialLoading() {
  await loadList()
}

onMounted(initialLoading)
</script>

<template>
  <NewGameListComponent v-if="!list"/>
  <GameListDetailsComponent :list="list" v-else/>
</template>

<style>
#gamelist {
  padding: 20px 20px 90px 20px;
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

.lists-table {
  margin-bottom: 12px;
}

td.input-cell {
  min-width: 200px;
  padding: 0;
}

td.no-wrap {
  min-width: 120px;
  max-width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
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
