import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {AppRouter} from "./router"
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import ky from './locales/kg/ky.json' assert { type: 'json' };
import ru from './locales/ru/ru.json' assert { type: 'json' };

import Vue3Toastify, {type ToastContainerOptions} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const router = createRouter({
    history: createWebHistory(),
    routes: AppRouter
})

const i18n = createI18n({
    legacy: false,
    locale: 'ky',
    fallbackLocale: 'ru',
    messages: { ru, ky }
});

const pinia = createPinia()

createApp(App)
    .use(Vue3Toastify, {autoClose: 2000} as ToastContainerOptions)
    .use(pinia)
    .use(router)
    .use(pinia)
    .use(i18n)
    .mount('#app')
