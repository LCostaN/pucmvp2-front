<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import LoadingComponent from '../components/LoadingComponent.vue'
import GameListDetailsComponent from '../components/GameListDetailsComponent.vue'

import store from '../store'
import { gameListService } from '../services'

const route = useRoute()

const list = ref()
const loading = ref(true)

async function loadList() {
  try {
    loading.value = true
    list.value = store.lists.find((l) => l.id == route.params?.id)
    if (!list.value) list.value = await gameListService.get(route.params.id)
  } catch (e) {
    console.error('LOAD LIST FAIL', e)
    list.value = undefined
  } finally {
    loading.value = false
  }
}

function initialLoading() {
  loadList()
}

onMounted(initialLoading)
</script>

<template>
  <main id="gamelist">
    <!-- loading -->
    <LoadingComponent v-if="loading" />

    <!--  success -->
    <GameListDetailsComponent :list="list" v-else-if="list" />

    <!-- error -->
    <div class="p-20" v-else>
      <div class="card">Lista não encontrada</div>
    </div>
  </main>
</template>

<style>
.p-20 {
  margin: 20px;
}
</style>
