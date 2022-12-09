import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";
import axios from "axios"

// import "./assets/main.css";
import './assets/index.css'

const pinia = createPinia();
const app = createApp(App);

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const axiosInstance = axios.create({
})

app.use(router);
app.use(pinia);

app.config.globalProperties.$axios = { ...axiosInstance }

app.mount("#app");
