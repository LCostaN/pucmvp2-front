<script setup>
import { RouterLink } from 'vue-router'
import store from '../store'

function logout() {
  store.reset()

}
</script>

<template>
  <header>
    <nav>
      <div v-if="$route.name == 'details'" class="logo clickable" @click="$router.go(-1)">
        <font-awesome-icon :icon="['fas', 'arrow-left']" style="color: var(--color-button)" />
      </div>
      <img v-else alt="Vue logo" class="logo" src="@/assets/logo.svg" width="36" height="36" />
      <div class="nav-links">
        <RouterLink to="/">Jogos</RouterLink>
        <RouterLink to="/lists">Listas</RouterLink>
        <RouterLink to="/profile">Minhas Listas</RouterLink>
        <RouterLink to="/profile" v-if="store.user" class="logout" @click="logout">
          Sair <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  overflow: hidden;
}

nav {
  width: 100%;
  display: flex;
  align-items: stretch;
  background-color: var(--color-border-hover);
}
.logo {
  display: block;
  background-color: darkgrey;
  width: 72px;
  padding: 0.25em;
  text-align: center;
}
.nav-links {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: end;
  flex: 1;
}

nav a.router-link-exact-active {
  color: blue;
  cursor: default;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
  padding: 0.2rem 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

nav a.logout {
  background-color: red;
  color: white;
}

nav a.logout:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
