<script setup>
import { ref, computed } from 'vue'
import { vMaska } from 'maska'

import store from '../store'
import { OrderProduct, Product } from '../models'
import { money } from '../utils/formatter';


const props = defineProps({ product: Product })

const orderProduct = ref(OrderProduct.fromProduct(props.product))

const quantity = computed(
  () => store.order.products.find((p) => p.id == orderProduct.value.id)?.quantity
)

function increment() {
  orderProduct.value.quantity = Math.min(
    props.product.stock,
    parseInt(orderProduct.value.quantity) + 1
  )
}

function decrement() {
  orderProduct.value.quantity = Math.max(
    0,
    Math.min(orderProduct.value.quantity - 1, props.product.stock)
  )
}

function addToCart() {
  store.updateProductOrder(orderProduct.value.copy())
}
</script>

<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" @click="$emit('selectImage', product.image)" />
    <div class="product-description">
      <b>{{ product.name }}</b> <br />
      {{ product.description }}
    </div>
    <div class="product-specification">
      <span><b>Peso:</b> {{ product.weight }} g</span>
      <span><b>Preço:</b> {{ money.format(product.price) }} </span>
      <span><b>Estoque:</b> {{ product.stock }}</span>
    </div>
    <div class="product-card-input-control">
      <button class="remove-button" @click="decrement">-</button>
      <input v-maska data-maska="##" v-model="orderProduct.quantity" min="0" :max="product.stock" />
      <button class="add-button" @click="increment">+</button>
      <div class="spacer" v-show="!quantity" />
      <div class="cart-quantity" v-show="quantity"><b>Carrinho:</b> {{ quantity }}</div>
      <button class="add-to-cart-button" @click="addToCart">
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 1px 10px 10px black;
  transition: all 0.3s;
}
.product-card img {
  width: 100%;
  height: 50%;
  object-fit: fill;
}

.product-description,
.product-specification,
.product-card-input-control {
  padding: 0 12px;
  line-height: 1.4;
  font-size: 12px;
}

.product-description b {
  font-size: 15px;
}

.product-description {
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.product-specification {
  margin-bottom: 4px;
}

.product-specification,
.product-card-input-control {
  display: flex;
  justify-content: space-between;
}

.product-card-input-control {
  height: 20px;
  overflow: hidden;
  margin-bottom: 12px;
}

.product-card-input-control input {
  width: 30px;
  text-align: center;
}

.spacer {
  flex: 1;
}

.cart-quantity {
  flex: 1;
  padding: 0 8px;
  background-color: white;
  border: solid 1px grey;
  text-align: center;
}

.remove-button,
.add-button {
  width: 30px;
  color: white;
}

.remove-button {
  background-color: red;
}

.add-button {
  background-color: green;
}

.add-to-cart-button {
  width: 40px;
  background-color: green;
  color: white;
}
</style>
