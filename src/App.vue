<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="36" height="36" />
      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
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
  padding: .25em;
}
.nav-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: end;
  flex: 1;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
  padding: .2rem 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
