<script setup>
defineProps({ src: String })
defineEmits(['close'])
</script>

<template>
  <div class="image-preview" @click="$emit('close')">
    <div class="image-card" :style="{'background-image': 'url(' + src +')'}"/>
  </div>
</template>

<style scoped>
  .image-preview {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000060;
    z-index: 999;
  }

  .image-card {
    min-width: 60%;
    min-height: 60%;
    max-width: 90%;
    max-height: 90%;
    aspect-ratio: 1;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
</style>
