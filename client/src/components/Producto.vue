<template>
  <div class="ui card product">
    <div class="image">
      <img :src="API_URL + product.image.url" :alt="product.Name" />
    </div>
    <div class="content">
      <div class="header">{{ product.Name }}</div>
      <div class="description">{{ product.price }} $</div>
    </div>
    <div class="ui button primary" @click="addProductoCarro(product.id)">
      Comprar
    </div>
  </div>
</template>

<script>
import { API_URL } from '../utils/constants';
import {addproductosCarro} from '../api/carrito';
export default {
    name: 'Producto',
    props: {
      product: Object,
    },
    setup(props){
      const addProductoCarro = (idProducto)=>{
        addproductosCarro(idProducto);
      };
      return {
        API_URL,
        addProductoCarro,

      };
    },
};
</script>

<style lang="scss" scoped>
.product {
  &:hover {
    .ui.button {
      min-height: 36px;
    }
  }

  .ui.button {
    max-height: 0;
    min-height: 0;
    overflow: hidden;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: min-height 0.6s ease;
  }
}
</style>