import {uniqBy, countBy } from "lodash";
import { API_URL, PRODUCTS} from "../utils/constants";

export function addproductosCarro(idProducto){
    const productos = getCartApi();
    productos.push(idProducto);

    localStorage.setItem(PRODUCTS, JSON.stringify(productos));
}

export function getCartApi(){
    const productos = localStorage.getItem(PRODUCTS);

    if(!productos) return [];

    return JSON.parse(productos);
}

export async function getProductosCarro() {
    const idProductos = getCartApi();
  
    if (idProductos.lenght === 0) return null;
  
    try {
        const productos = [];
        for await (const idProducto of idProductos) {
            const response = await fetch(`${API_URL}/productos/${idProducto}`);
            const result = await response.json();
            productos.push(result);
        }
  
        const productsCount = countBy(productos, (product) => {
            return product.Name;
        });
  
        const combined = uniqBy(productos, (product) => {
            const productTemp = product;
            productTemp.quantity = productsCount[product.Name];
            return productTemp.Name;
        });
        return combined;

    }catch (error) {
      console.log(error);
      return null;
    }
}

export function deleteAllProductoCarro(idProduct) {
    const productos = getCartApi();
  
    const index = productos.indexOf(idProduct);
  
    if (index > -1) {
      productos.splice(index, 1);
      localStorage.setItem(PRODUCTS, JSON.stringify(productos));
      deleteAllProductoCarro(idProduct);
    }
  }
