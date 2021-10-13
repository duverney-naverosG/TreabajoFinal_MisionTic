<template>
  <div class="carro-body" v-if="productos">
    <div class="producto" v-for="product in productos" :key="product.id">
      <img
        class="ui image fluid"
        :src="API_URL + product.image.url"
        :alt="productos.Name"
      />
      <div class="info">
        <p>{{ product.Name }}</p>
        <div class="price">
          <p>${{ product.price }}</p>

          <div class="quantity">
            <p>CANTIDAD: </p>
            <p>{{ product.quantity }}</p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {API_URL} from '../../utils/constants';
export default {
    name: 'carroBody',
    props: {
        productos: Array,
    },
    setup(){
        return { API_URL };
    },
};
</script>

<style lang="scss" scoped>
.carro-body {
  padding: 20px 10px;
  overflow-y: scroll;
  height: calc(100vh - 50px - 90px);
  &::-webkit-scrollbar {
    display: none;
  }
  .producto {
    display: flex;
    .ui.image.fluid {
      width: 100px !important;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }
    .price {
      display: flex;
      justify-content: space-between;
      p {
        margin: 0;
      }
    }
    .quantity {
      display: flex;
      align-items: center;
      p {
        margin: 0 10px;
      }
      button {
        padding: 4px 10px;
      }
    }
  }
}
</style>