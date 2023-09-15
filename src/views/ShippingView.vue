<script setup>
import ShippingFormComponent from '../components/ShippingFormComponent.vue';
import EndReviewComponent from '../components/EndReviewComponent.vue';
</script>

<template>
  <main id="shipping">
    <ShippingFormComponent/>
    <EndReviewComponent />
  </main>
</template>

<style>
#shipping {
  display: flex;
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

#shipping > * {
  flex: 1;
}
</style>
