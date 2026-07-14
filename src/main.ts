import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles/variables.css';

import '@fontsource/inter';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import { router } from './router/index.ts';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
