import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'

// 必要なアイコンをライブラリに追加
library.add(faCoffee, faTrash)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
