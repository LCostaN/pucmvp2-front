<script setup>
import { computed } from 'vue'
const props = defineProps({ value: String })
const emit = defineEmits(['change'])

const filter = computed({
  get() {
    return props.value
  },

  set(val) {
    emit('change', val)
  }
})
</script>

<template>
  <div class="search-input-control">
    <font-awesome-icon class="search-icon" :icon="['fas', 'magnifying-glass']" />
    <input class="search-input" v-model="filter" />
  </div>
</template>

<style scoped>
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
