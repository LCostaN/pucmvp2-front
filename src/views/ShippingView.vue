<script setup>
import { reactive, ref } from 'vue'
import { vMaska } from 'maska'

import store from '../store'
import { shippingService, CEP_ORIGIN } from '../services'
import { Shipping } from '../models'

const cep = reactive({ masked: store.order.cep })
const shipping = ref(new Shipping(CEP_ORIGIN, store.order.cep.replace('-', '')))

async function calculate() {
  store.order.cep = cep.unmasked
  shipping.value.cepDestino = cep.unmasked
  const response = await shippingService.getShippingCost(store.order)
  return Shipping.fromJson(response)
}
</script>

<template>
  <main>
    <input v-maska="cep" data-maska="#####-###" :value="cep.masked" placeholder="CEP" />
    <button @click="calculate">Calcular Frete</button>
    <div>
      Shipping: <br />
      {{ shipping }}
    </div>
  </main>
</template>
