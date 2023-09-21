<script setup>
import AuthComponent from '../components/AuthComponent.vue'
import FloatingButton from '../components/FloatingButton.vue'
import MyListsComponent from '../components/MyListsComponent.vue'
import store from '../store'

</script>

<template>
  <main id="profile">
    <AuthComponent v-if="!store.user" />
    <div v-else>
      <MyListsComponent />
      <RouterLink to="/lists/new" custom v-slot="{ navigate }">
        <FloatingButton @click="navigate">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </FloatingButton>
      </RouterLink>
    </div>
  </main>
</template>

<style>
#profile {
  display: grid;
  grid-template-rows: min-content min-content;
  gap: 20px;
  padding: 12px 12px 90px 12px;
  height: 100vh;
  
  overflow-x: hidden;
  overflow-y: auto;
}

.profile-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-auto-rows: 300px;
  gap: 20px;
  justify-content: center;
}
</style>
