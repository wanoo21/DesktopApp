import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import moment from 'moment'
import underscore from 'underscore'
import accounting from 'accounting'

Vue.use(Vuex)
Vue.use(underscore)
Vue.use(require('vue-resource'))

const store = new Vuex.Store({
    state: {
        sources: [],
        selectedSource: {},
        articles: [],
        category: [],
        fx: '',
        currentView: 'sources',
        selectedCategory: ''
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
        progress: event => {
            console.log('Percent %s%', Math.round(event.loaded * 100 / event.total))
        }
    },
    created () {
      this.$store.state.newsResource = this.$resource('https://newsapi.org/v1', {}, customActions)
      this.$store.state.exchange = this.$resource('https://api.fixer.io/latest', {})
    },
    store,
    components: {App}
})

Vue.filter('dateFromNow', function (value) {
    return moment(value).fromNow()
})
Vue.filter('currencyFormat', function (value, rate) {
    return accounting.formatMoney(value, { symbol: rate, format: '%v %s' })
})
