<script setup>
import { ref } from 'vue'

import store from '../store'
import { money } from '../utils/formatter'

import OrderProductCardComponent from '../components/OrderProductCardComponent.vue'
import ImagePreviewComponent from '../components/ImagePreviewComponent.vue'

const selectedImage = ref(null)

store.order.products.sort((a, b) => a.id - b.id)

function selectImage(val) {
  selectedImage.value = val
}
</script>

<template>
  <main id="order">
    <div class="order-wrapper" v-if="store.order.products.length > 0">
      <OrderProductCardComponent
        :key="item"
        v-for="item in store.order.products"
        :order-product="item"
        @selectImage="selectImage"
      />
    </div>
    <div class="no-shop" v-else>Nenhum produto no carrinho no momento</div>
    <ImagePreviewComponent
      v-show="selectedImage"
      :src="selectedImage"
      @close="selectedImage = null"
    />
    <div class="total-wrapper" v-if="store.order.products.length > 0">
      <b>Total: </b>
      {{ money.format(store.order.products.reduce((total, p) => total + p.total, 0)) }}
    </div>
    <RouterLink custom to="/shipping" v-slot="{ navigate }">
      <button
        v-if="store.order.products.length > 0"
        class="finish-shopping-button"
        @click="navigate"
        role="link"
      >
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </button>
    </RouterLink>
  </main>
</template>

<style>
#order {
  padding: 12px 12px 90px 12px;
  height: 100vh;
  background: linear-gradient(
    225deg,
    grey,
    darkgrey,
    grey,
    darkgrey,
    grey,
    darkgrey,
    grey,
    darkgrey,
    grey,
    darkgrey
  );
  overflow-x: hidden;
  overflow-y: auto;
}

.order-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 260px);
  grid-auto-rows: 250px;
  gap: 10px;
  justify-content: center;
}

.total-wrapper {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  padding-left: 25px;
  height: 42px;
  z-index: 9;
  background-color: darkgrey;
  box-shadow: 0px 0px 12px black;
}

.total-wrapper b {
  margin-right: 10px;
}
</style>
