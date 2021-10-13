<template>
  <div class="basic-layout">
      <Menu />
      <div class="ui container">
          <slot />
      </div>
  </div>
  <carro />
</template>

<script>
import Menu from '../components/Menu.vue'
import carro from '../components/cart/carro'

export default {
    name: "BasicLayout",
    components:{
        Menu,
        carro,
    },

};
</script>

<style>

</style>