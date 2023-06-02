import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import clickHoldDirective from './composables/ClickHoldDirective'

import './assets/isekaid.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('click-hold', clickHoldDirective)

app.mount('#app')
