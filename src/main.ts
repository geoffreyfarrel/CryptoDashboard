import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles/variables.css';

import '@fontsource/inter';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
