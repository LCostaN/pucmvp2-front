<script setup>
import { RouterLink, RouterView } from 'vue-router'
import store from './store';
</script>

<template>
  <header>
    <nav>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="36"
        height="36"
      />
      <div class="nav-links">
        <RouterLink to="/">Jogos</RouterLink>
        <RouterLink to="/lists">Listas</RouterLink>
        <RouterLink to="/profile">Minhas Listas</RouterLink>
        <a v-if="store.user" class='logout' @click="store.reset">
          Sair <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        </a>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  overflow: hidden;
}

nav {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--color-border);
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
  align-items: center;
  justify-content: end;
  flex: 1;
}

nav a.router-link-exact-active {
  color: var(--color-button);
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
  color: red;
}

nav a.logout:hover {
  background-color: #ff000020;
  cursor: pointer;
}
</style>
