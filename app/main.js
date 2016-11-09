import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(require('vue-resource'))

const store = new Vuex.Store({
    state: {
        sources: [],
        articles: [],
        newsApiPath: 'https://newsapi.org/v1'
    }
})

/* eslint-disable no-new */
new Vue({
    el: 'body',
    store,
    components: {App}
})

// Vue.http.headers['X-Api-Key'] = 'fa1a73acf8c142ac9e98f05fce988e6e'
