<script setup>
import { reactive, ref } from 'vue'
import { vMaska } from 'maska'

import store from '../store'
import { shippingService, CEP_ORIGIN } from '../services'
import { Shipping } from '../models'
import { money } from '../utils/formatter'

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
  <div class="shipping-form-wrapper">
    <div class="shipping-form-input">
      <h3>Insira o CEP</h3>
      <input v-maska="cep" data-maska="#####-###" :value="cep.masked" placeholder="CEP" />
      <button @click="calculate">Calcular Frete</button>
    </div>

    <div class="options-wrapper">
      <h3>Escolha opção de envio</h3>
      <div
        :class="{ 'options-control': true, selected: store.order.shipOption == 0 }"
        @click="store.order.shipOption = 0"
        v-if="shipping.valorPac"
      >
        <div class="options-input">
          <label for="pac"><b> PAC </b></label>
          <input type="radio" id="pac" value="0" v-model="store.order.shipOption" />
        </div>
        <div class="options-input">
          <span>{{ shipping.prazoPac }} dias</span>
          <span>{{ money.format(shipping.valorPac) }}</span>
        </div>
      </div>
      <div
        :class="{ 'options-control': true, selected: store.order.shipOption == 1 }"
        @click="store.order.shipOption = 1"
        v-if="shipping.valorSedex"
      >
        <div class="options-input">
          <label for="sedex"><b> Sedex </b></label>
          <input type="radio" id="sedex" value="1" v-model="store.order.shipOption" />
        </div>
        <div class="options-input">
          <span>{{ shipping.prazoSedex }} dias</span>
          <span>{{ money.format(shipping.valorSedex) }}</span>
        </div>
      </div>
      <div class="no-shipping-available">
        <h4>Não há formas de envio disponíveis para este endereço</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shipping-form-input {
  margin-bottom: 20px;
}

.options-wrapper,
.shipping-form-input {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
}

h3 {
  border-bottom: solid 2px grey;
  margin-bottom: 20px;
}

.options-control {
  background-color: #0000ff0f;
  margin-bottom: 12px;
  padding: 4px 12px;
  border: 6px double blue;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0px 0px 2px blue;
}

.options-control.selected {
  background-color: #0000ff25;
  box-shadow: 0px 0px 10px blue;
}

.options-input {
  display: flex;
  justify-content: space-between;
}
</style>
