<template>
  <BasicLayouts>
     <h1>Últimos productos</h1>
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
import BasicLayouts from '../layouts/BasicLayouts.vue';
import { getProducts } from '../api/productos';
import Producto from '../components/Producto.vue'
export default {
  name: 'Home',
  components: {
    BasicLayouts,
    Producto,
  },
   setup() {
    let productos = ref(null);
    onMounted(async () => {
      const response = await getProducts(20);
      console.log(response);
      productos.value = response;
    });
    return {
      productos,
    };
  },
};
</script>
