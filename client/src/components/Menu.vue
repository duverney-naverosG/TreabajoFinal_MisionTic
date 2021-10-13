<template>
  <div class="ui secondary menu">
      <div class="ui container">
          <div class="left menu">
              <router-link class="item" to="/"> 
                <img class="ui small image" src="../assets/logo.png" alt="Tienda" />
                <template v-for="category in categorias" :key="category.id">
                    <router-link class="item" :to="category.slug">
                        {{ category.title }}
                    </router-link>
                </template>
              </router-link>
          </div>
          <div class="right menu">
              <router-link class="item" to="/login" v-if="!token">
              <i class="user circle icon"></i>
              iniciar sesion
              </router-link>
              <template v-if="token">
                    <span class="ui item cart">
                        <i class="cart arrow down icon" @click="openCarro"></i>
                    </span>
                    <span class="ui item logout" @click="logout">
                        <i class="sign-out icon"></i>
                    </span>
                </template>
          </div>
      </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {useStore} from 'vuex'; 
import { getTokenApi, deleteToken, deleteProductos } from '../api/token';
import { getCategoriesApi} from '../api/categorias';
export default {
  name: 'Menu',
  setup() {
    let categorias = ref(null);
    const token = getTokenApi();
    const store = useStore();

    onMounted(async () => {
      const response = await getCategoriesApi();
      categorias.value = response;
    });
    const logout = () => {
      deleteToken();
      deleteProductos();
      location.replace('/');
    };

    const openCarro = ()=>{
        store.commit('setShowCart', true);
    };
    return {
      token,
      logout,
      categorias,
      openCarro,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui.menu.secondary{
    background-color: #14D146;
    .item{
        color: #ffffff;
        &:hover{
            color: #080a0a
        }
    }
    .menu.left{
        width: 50%;
        .ui.image{
            width: 200px; 
        }
    }
    .menu.right{
        width: 50%;
        justify-content: flex-end;
        .logout,
        .cart{
            &:hover{
                cursor:pointer;
            }
        }
    }
}

</style>