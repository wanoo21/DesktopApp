<template>
    <div id="app">
        <component :is="currentView"></component>
    </div>
</template>

<style lang="scss">
    html {
        box-sizing: border-box;
    }
    *, *::after, *::before {
        box-sizing: inherit;
    }
    @import "./scss/variables";

    body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        overflow: hidden;
        color: $primaryDark;
        #app {
            height: 100vh;
            @include display(flex);
            background-color: $primaryLight;
            @include justify-content(center);
            main {
                flex: 1;
            }
        }
    }
    /* Transitions */
    .fade-transition {
        @include transition(all .2s ease-in-out);
        opacity: 1;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>

<script>
  import articles from './components/articles'
  import sources from './components/sources'
  import fx from 'money'

  export default {
    data () {
        return {
            itemsFilter: ''
        }
    },
    computed: {
        currentView () {
            return this.$store.state.currentView
        }
    },
    ready () {
        this.$store.state.newsResource.getSources().then((res) => {
            if (res.body.status === 'ok') {
                this.$store.state.sources = res.body.sources
            }
        })
        this.$store.state.exchange.get({ base: 'PHP' }).then(rate => {
            if (rate.ok) {
                fx.rates = rate.body.rates
                fx.base = rate.body.base
                this.$store.state.fx = fx
            } else {
                console.error(rate.statusText)
            }
        })
    },
    methods: {},
    components: {
      articles,
      sources
    }
  }

</script>
