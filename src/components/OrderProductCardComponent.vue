<script setup>
import { OrderProduct } from '../models'
import { money } from '../utils/formatter';

defineProps({ orderProduct: OrderProduct })
</script>

<template>
  <div class="order-product-card">
    <img :src="orderProduct.image" :alt="orderProduct.name" @click="$emit('selectImage', orderProduct.image)" />
    <div class="order-product-description">
      <b>{{ orderProduct.name }}</b> <br />
      {{ orderProduct.description }}
    </div>
    <div class="order-product-specification">
      <span><b>Unidades:</b> {{ orderProduct.quantity }}</span>
      <span><b>Preço:</b> {{ money.format(orderProduct.price * orderProduct.quantity) }} </span>
    </div>
  </div>
</template>

<style scoped>
.order-product-card {
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 1px 10px 10px black;
  transition: all 0.3s;
}
.order-product-card img {
  width: 100%;
  height: 50%;
  object-fit: fill;
}

.order-product-description,
.order-product-specification {
  padding: 0 12px;
  line-height: 1.4;
  font-size: 12px;
}

.order-product-description b {
  font-size: 15px;
}

.order-product-description {
  flex: 4;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.order-product-specification {
  flex: 1;
  margin-bottom: 4px;
}

.order-product-specification {
  display: flex;
  justify-content: space-between;
}
</style>
