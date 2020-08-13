import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initialState } from './store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        localStorage.setItem('initialState', JSON.stringify(initialState));
    }
}).$mount('#app')
