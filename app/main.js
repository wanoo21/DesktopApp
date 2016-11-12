import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(require('vue-resource'))

const store = new Vuex.Store({
    state: {
        sources: [],
        articles: []
    }
})

const customActions = {
    getSources: {
        method: 'GET',
        url: 'https://newsapi.org/v1/sources'
    },
    getArticles: {
        method: 'GET',
        url: 'https://newsapi.org/v1/articles?source={source}'
    }
}

/* eslint-disable no-new */
new Vue({
    el: 'body',
    http: {
        headers: {
            'X-Api-Key': 'fa1a73acf8c142ac9e98f05fce988e6e'
        },
        progress: event => {}
    },
    created () {
      this.$store.state.newsResource = this.$resource('https://newsapi.org/v1', {}, customActions)
    },
    store,
    components: {App}
})

Vue.filter('dateFromNow', function (value) {
    return moment(value).fromNow()
})
