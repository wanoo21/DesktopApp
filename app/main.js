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
