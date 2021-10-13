<template>
  <BasicLayouts>
     <h2>PRODUCTOS</h2>
     <div class="ui grid">
        <div
          class="sixten wide mobile eight wide tablet four wide computer column"
          v-for="product in productos"
          :key="product.id"
          >
          <Producto :product="product" />
        </div>
      </div>
  </BasicLayouts>
</template>

<script>
import { ref, onMounted } from 'vue'; 
import {useRoute} from 'vue-router';
import BasicLayouts from '../layouts/BasicLayouts.vue';
import Producto from '../components/Producto.vue'
import {getProducts, getProductosCategoria} from '../api/productos';

export default {
    name: 'categoria',
    components: {
        BasicLayouts,
        Producto,
    },

    watch: {
      $route(to, from) {
        this.getProducts(to.params.categoria);
      },
    },

    setup(){
      let productos = ref(null);
      const { params } = useRoute();
      onMounted(async()=>{
        getProducts(params.categoria); 

      });

      const getProducts = async (categoria)=>{
        const response = await getProductosCategoria(categoria);
        productos.value=response;
      };
      return{
        getProducts,
        productos,
      };
    },
};
</script>

<style>

</style>