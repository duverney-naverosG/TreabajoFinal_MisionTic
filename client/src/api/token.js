import { TOKEN } from "../utils/constants";

export function setTokenApi(token) {
    localStorage.setItem(TOKEN, token);
}
  
export function getTokenApi(){
    return localStorage.getItem(TOKEN);
}

export function deleteToken(){
    return localStorage.removeItem(TOKEN);
}

export function deleteProductos(){
    return localStorage.clear();
}
