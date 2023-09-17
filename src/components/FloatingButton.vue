<script setup>
defineProps({
  className: String
})
</script>

<template>
  <button :class="'fab ' + className">
    <slot />
  </button>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  color: white;
  background-color: var(--color-button);
}
</style>
