import { createApp } from 'vue';
import App from './App.vue';
import setupVueDevTools from "./composables-plugin";


const app = createApp(App);
setupVueDevTools(app)
app.mount('#app');
