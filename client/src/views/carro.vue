<template>
    <BasicLayouts>
        <h1>Carrito</h1>
        <table class="ui celled table" v-if="productos">
      <thead>
        <tr>
          <th>PRODUCTO</th>
          <th>CANTIDAD</th>
          <th>PRECIO</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productos" :key="product.id">
          <td>{{ product.Name }}</td>
          <td>{{ product.quantity }}</td>
          <td>$ {{ product.price }}</td>
          <td style="text-align: center">
            <i class="close icon" @click="eliminarproductoCarro(product.id)"></i>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>Total:</td>
          <td colspan="2">{{ getTotal() }}</td>
        </tr>
      </tbody>
    </table>

        <button class="ui button primary fluid">
            Generar pedido
        </button>

        <h3 v-if="!productos">No tienes productos en el carrito</h3>
    </BasicLayouts>
</template>

<script>
import {watchEffect, ref} from 'vue';
import BasicLayouts from '../layouts/BasicLayouts.vue';
import {getProductosCarro, deleteAllProductoCarro} from '../api/carrito';
export default {
    name: 'carro',
    components: {
        BasicLayouts,
    },
    setup(){
        let productos = ref(null);
        let realoadCarro = ref(false);
        watchEffect(async ()=>{
            realoadCarro.value;
            const response = await getProductosCarro();
            productos.value = response;
        });

        const getTotal= () =>{
            let total = 0;
            productos.value.forEach((productos) =>{
                total += productos.price * productos.quantity;
            });
            return total.toFixed(2);
        };

        const eliminarproductoCarro=(idProducto)=>{
            deleteAllProductoCarro(idProducto);
            realoadCarro.value = !realoadCarro.value;
        };

        return{
            productos,
            getTotal,
            eliminarproductoCarro,
        };
    },

};
</script>

<style>

</style>