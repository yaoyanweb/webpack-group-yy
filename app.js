import Vue from 'vue';
import router from './src/router/index';
import App from './src/views/App.vue'
import store from './src/store/index';
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app');