<template>
  <div class="caro-footer">
      <p>total: {{ total }}</p>

      <router-link to="/carro">
          <button class="ui button primary fluit btn-buy" @click="closeCart">
              comprar
          </button>
      </router-link>
  </div>
</template>

<script>
import {ref, watchEffect} from 'vue';
export default {
    name: 'footerCarro',
    props: {
        productos: Array,
        closeCart: Function, 
    },
    setup(props){
        let total = ref();
        watchEffect(()=>{
            props.productos;
            let totalTemp = 0;
            props.productos.forEach((productos)=>{
                totalTemp+=productos.price * productos.quantity;
            });
            total.value = totalTemp.toFixed(2);
        });
        return{
            total,
        };
    },
};
</script>

<style lang="scss" scoped>
.carro-footer {
  padding: 10px;
}
</style>