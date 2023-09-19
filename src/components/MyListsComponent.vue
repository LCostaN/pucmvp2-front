<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '../store'

const router = useRouter()

const filter = ref('')
const display = computed(() => store.lists.filter((gl) => gl.name.includes(filter.value)))

function goToDetails(id) {
  router.push(`/lists/${id}`)
}
</script>

<template>
  <div v-if="store.lists.length > 0">
    <div class="search-input-control">
      <font-awesome-icon class="search-icon" :icon="['fas', 'magnifying-glass']" />
      <input class="search-input" v-model="filter" />
    </div>
    <table class="lists-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th width="1">Pública</th>
          <th>Tags</th>
          <th width="1">Jogos</th>
        </tr>
      </thead>
      <tbody>
        <tr class='clickable' :key="item.id" v-for="item in display" @click="() => goToDetails(item.id)">
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td class="center">
            <font-awesome-icon
              v-if="!item.isPrivate"
              :icon="['fas', 'circle-check']"
              style="color: green"
            />
          </td>
          <td class="center no-wrap">{{ item.tags.join(', ') || '-' }}</td>
          <td class="center">{{ item.games.length }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card" v-else>Clique no botão "+" e crie sua primeira lista!</div>
</template>

<style scoped></style>
