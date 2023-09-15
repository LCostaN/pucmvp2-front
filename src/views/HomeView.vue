<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { productService } from '../services'
import store from '../store'

import ProductCardComponent from '../components/ProductCardComponent.vue'
import ImagePreviewComponent from '../components/ImagePreviewComponent.vue'

const products = ref([])
const selectedImage = ref(null)

async function getProducts() {
  try {
    products.value = await productService.getProducts()
  } catch (e) {
    products.value = []
    console.log(e)
  }
}

function selectImage(val) {
  selectedImage.value = val
}

onMounted(getProducts)
</script>

<template>
  <main id="home">
    <div class="shop-wrapper" v-if="products.length > 0">
      <ProductCardComponent
        :key="item"
        v-for="item in products"
        :product="item"
        @selectImage="selectImage"
      />
    </div>
    <div class="no-shop" v-else>Nenhum produto à venda no momento</div>
    <ImagePreviewComponent
      v-show="selectedImage"
      :src="selectedImage"
      @close="selectedImage = null"
    />
    <RouterLink custom to="/order" v-slot="{ navigate }">
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
#home {
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

.shop-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, 260px);
  grid-auto-rows: 250px;
  gap: 10px;
  justify-content: center;
}
</style>
