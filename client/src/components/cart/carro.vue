<template>
    <div class="cart-dinner" :class="{open: showCart}" @click="closetCarro"></div>
  <div class="carro" :class="{ open: showCart}">  
      <div>
          <carroHeader :closeCart="closetCarro"/>
          <carroBody :productos= "productos"/>
      </div>
      <footerCarro :productos= "productos" :closeCart="closetCarro" v-if="productos"/>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex'; 
import carroHeader from '../cart/carroHeader';
import carroBody from './carroBody.vue';
import { getProductosCarro } from '../../api/carrito.js'
import footerCarro from './footerCarro.vue';
export default {
    name: 'carro',          
    components:{
        carroHeader,
        carroBody,
        footerCarro,
    },
    setup(){
        const store = useStore();
        const showCart = computed(()=>store.state.showCart);
        let productos = ref(null);

        const getProductoCarro = async () => {
            const response = await getProductosCarro();
            console.log(response);
            productos.value = response;
        };

        watchEffect(()=>{
            showCart.value;
            getProductoCarro();
        });

        const closetCarro = ()=>{
            store.commit('setShowCart', false);
        };

        return{
            showCart,
            closetCarro,
            productos,
        }; 
    },
};
</script>

<style lang="scss" scoped>
.cart-dinner {
  opacity: 0;
  transition: opacity 0.5 ease;
  &.open {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
  }
}
.carro{
    position: fixed;
    right: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 400px;
    height: 100vh;
    background-color: #fff;
    box-shadow: 0px 0px 26px 5px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.9s ease;
    transform: translateX(150%);
    &.open {
    transform: translateX(0);
  }
}
</style>