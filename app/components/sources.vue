<template>
    <main>
        <header>
            <div id="input-filter">
                <input type="search" autofocus v-model="filterSources" placeholder="Filter all {{sourcesCount}} sources">
            </div>
        </header>
        <content>
            <div id="sources">
                <div v-for="source in sources | filterBy filterSources 'name'" class="source">
                    <div class="source-content">
                        <img :src="source.urlsToLogos.medium">
                        <div class="source-cover" @click="getArticles(source)">
                            <button>
                                <i class="fa fa-newspaper-o" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </content>
    </main>
</template>

<style lang="scss">
    @import "../scss/variables";

    main {
        @include display(flex);
        @include flex-direction(column);
        @include justify-content(space-between);
        header {
            width: 100%;
            padding: 0;
            #input-filter {
                padding: 2rem;
                input {
                    width: 100%;
                    border-radius: 3px;
                    padding: 10px;
                    border: none;
                    outline: none;
                    box-shadow: 0 0 1px $secondDark;
                    @include transition(all .2s ease-in-out);
                    &:hover {
                        box-shadow: 0 0 3px $thirdDark;
                    }
                }
            }
        }
        content {
            flex: 1;
            overflow-x: hidden;
            overflow-y: auto;
            #sources {
                padding: rem(1) 2rem;
                .source {
                    @include span-columns(1 of 5);
                    @include omega(5n);
                    height: 150px;
                    border-radius: 3px;
                    box-shadow: 0 0 1px $secondDark;
                    margin-bottom: 15px;
                    background-color: lighten($primaryLight, 5);
                    position: relative;
                    &-content {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        padding: 0 5px;
                        img {
                            max-width: 100%;
                            max-height: 100%;
                        }
                    }
                    &:hover {
                        .source-cover {
                            opacity: 1;
                        }
                    }
                    &-cover {
                        @include transition(opacity .2s ease-in-out);
                        background-color: rgba(lighten($primaryDark, 5), .5);
                        position: absolute;
                        cursor: pointer;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        opacity: 0;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        left: 0;

                        button {
                            border: 2px dashed white;
                            background: transparent;
                            border-radius: 50%;
                            font-size: 20px;
                            padding: 5px 7px;
                            color: lighten($primaryLight, 10);
                            outline: none;
                            cursor: pointer;
                            i {
                                font-size: large;
                            }
                            & + button {
                                margin-left: 5px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>

<script>
    export default {
        data () {
            return {
                filterSources: ''
            }
        },
        computed: {
            sources () {
                return this.$store.state.sources
            },
            sourcesCount () {
                return this.$store.state.sources.length
            },
            categories () {
                var categories = []
                this.$store.state.sources.forEach(source => {
                    if (categories.indexOf(source.category) === -1) {
                        categories.push(source.category)
                    }
                })
                return categories
            }
        },
        methods: {
            getArticles (source) {
                this.$store.state.newsResource.getArticles({
                    source: source.id
                }).then((res) => {
                    if (res.body.status === 'ok') {
                        this.$store.state.articles = res.body.articles
                        this.$store.state.currentView = 'articles'
                        this.$store.state.selectedSource = source
                    }
                })
            }
        }
    }
</script>
