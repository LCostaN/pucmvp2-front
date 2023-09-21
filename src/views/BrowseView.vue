<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';

import SearchInputComponent from '../components/SearchInputComponent.vue';
import { gameListService } from '../services'

const router = useRouter()

const filter = ref('')
const lists = ref([])
const display = computed(() => lists.value.filter((gl) => gl.name.includes(filter.value)))

async function getLists() {
  try {
    lists.value = await gameListService.getAll()
  } catch (e) {
    lists.value = []
    console.log(e)
  }
}

function goToDetails(id) {
  router.push(`/lists/${id}`)
}

onMounted(getLists)
</script>

<template>
  <main id="browse">
    <SearchInputComponent :value="filter" @change="filter = $event"/>
    <table class="lists-table" v-if="lists.length > 0">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Autor</th>
          <th>Tags</th>
          <th width="24">Jogos</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable" :key="item.id" v-for="item in display" @click="goToDetails(item.id)">
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td class="center">{{ item.user }}</td>
          <td class="center no-wrap">{{ item.tags.join(', ') || '-' }}</td>
          <td class="center">{{ item.games.length }}</td>
        </tr>
      </tbody>
    </table>
    <div class="card" v-else>Nenhuma lista encontrada no momento</div>
  </main>
</template>

<style>
#browse {
  padding: 12px 12px 90px 12px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
