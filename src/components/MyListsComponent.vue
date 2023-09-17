<script setup>
import { ref, computed } from 'vue'
import store from '../store'

const filter = ref('')
const display = computed(() => store.lists.filter((gl) => gl.name.includes(filter.value)))
</script>

<template>
  <div v-if="store.lists.length > 0">
    <div class="search-input-control">
      <font-awesome-icon class="search-icon" :icon="['fas', 'magnifying-glass']" />
      <input class="search-input" v-model="filter" />
    </div>
    <table class="lists-table" >
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Pública</th>
          <th>Tags</th>
          <th width="24">Jogos</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in display">
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td class="center">
            <font-awesome-icon :icon="['fas', 'circle-check']" style="color: green"/>
          </td>
          <td class="center">{{ item.tags.join(', ') || '-' }}</td>
          <td class="center">{{ item.games.length }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="card" v-else>Clique no botão "+" e crie sua primeira lista!</div>
</template>

<style scoped>
.lists-table {
  width: 100%;
  border: solid 2px #dddddd;
  background-color: #eeeeee;
}

.lists-table th {
  font-weight: bold;
  background-color: var(--color-button);
  color: white;
}

.lists-table th,
.lists-table td {
  border: #dddddd solid 1px;
  padding-left: 8px;
  padding-right: 8px;
}

.lists-table td {
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.center {
  text-align: center;
}

.search-input-control {
  position: relative;
}

.search-input {
  width: 100%;
  margin-bottom: 12px;
  padding: 8px 40px;
  border-radius: 20px;
  outline: 0;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 20%;
}
</style>
