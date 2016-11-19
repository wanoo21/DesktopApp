<template>
    <div id="app">
        <aside>
            <header>
                <div class="logo">
                    LOGO
                </div>
                <div id="items-search">
                    <input type="search" :disabled="currentView == 'sources'" v-model="itemsFilter" placeholder="Filter items">
                </div>
                <nav>
                    <ul>
                        <li v-for="item in items | filterBy itemsFilter in 'name'">
                            <!--<img :src="item.urlsToLogos.small">-->
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </nav>
            </header>
            <footer>
                <p class="cp">News source from <a target="_blank" class="js-external-link" href="http://newsapi.org">NewsAPI</a></p>
            </footer>
        </aside>
        <component :is="currentView"></component>
        <modal></modal>
    </div>
</template>

<style lang="scss">
    @import "./scss/variables";
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        overflow: hidden;
        color: $primaryDark;
        #app {
            height: 100vh;
            display: flex;
            background-color: $primaryLight;
            aside {
                width: 250px;
                min-width: 230px;
                margin-right: 25px;
                background: $secondDark;
                display: flex!important;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                header {
                    width: 100%;
                    .logo {
                        height: 90px;
                        color: $secondLight;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    #items-search {
                        input {
                            width: 100%;
                            padding: 10px 15px;
                            border: none;
                            outline: none;
                            font-size: 18px;
                        }
                    }
                    nav {
                        overflow-x: auto;
                        max-height: calc(100vh - 180px);
                        ul {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                            li {
                                padding: 15px;
                                cursor: pointer;
                                color: $primaryLight;
                                text-transform: uppercase;
                                display: flex;
                                align-items: center;
                                @include transition(background .2s ease-in-out);
                                &:hover, &.active {
                                    background: $primaryDark;
                                }
                                img {
                                    width: 25px;
                                    margin-right: 5px;
                                }
                                span { }
                            }
                        }
                    }
                }
                footer {
                    p.cp {
                        font-size: 15px;
                        color: darken($primaryDark, 2);
                        a {
                            color: inherit;
                            outline: none;
                            @include transition(all .2s ease-in);
                            &:hover {
                                color: darken($primaryDark, 5);
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
            main {
                flex: 1;
            }
        }
    }
    /* Transitions */
    .fade-transition {
        @include transition(all .2s ease-in-out);
        overflow: hidden;
        visibility: visible;
        opacity: 1;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
        visibility: hidden;
    }
    .fade-enter {
        @include transition-delay(.5s)
    }
</style>

<script>
  import articles from './components/articles'
  import sources from './components/sources'
  import modal from './directives/modal'
  import _ from 'underscore'

  export default {
    data () {
        return {
            currentView: 'sources',
            itemsFilter: ''
        }
    },
    computed: {
        items () {
            var categories = []
            _.each(this.$store.state.sources, source => {
                if (!_.findWhere(categories, { name: source.category })) {
                    categories.push({ name: source.category, id: 'category' })
                }
            })
            this.$store.state.categories = categories
            return categories
        },
        sources () {
            return this.$store.state.sources
        }
    },
    ready () {
        this.$store.state.newsResource.getSources().then((res) => {
            if (res.body.status === 'ok') {
                this.$store.state.sources = res.body.sources
            }
        })
    },
    methods: {
        switchView (view) {
            this.currentView = view
        }
    },
    components: {
      articles,
      sources,
      modal
    }
  }

</script>
