<template>
    <aside>
        <header>
            <div class="logo"> LOGO </div>
            <button @click="returnToSources()">
                <i class="fa fa-arrow-left" aria-hidden="true"></i> &nbsp; Back to all sources
            </button>
            <nav>
                <ul>
                    <li @click="getArticles(source)" :class="{active: selectedSource.id == source.id}" v-for="source in sources | filterBy selectedCategory 'category'">
                        <span>{{source.name}}</span>
                    </li>
                </ul>
            </nav>
        </header>
    </aside>
    <main>
        <!--<header>-->
            <!--<div id="filters">-->
                <!--<ul>-->
                    <!--<li>Top</li>-->
                    <!--<li class="active">Latest</li>-->
                    <!--<li>Popular</li>-->
                <!--</ul>-->
            <!--</div>-->
        <!--</header>-->
        <div id="breadcrumbs">
            <h1>{{selectedSource.name}} <small><i class="fa fa-newspaper-o" aria-hidden="true"></i> {{selectedCategory || 'All'}}</small></h1>
            <p v-if="selectedSource.description">{{{selectedSource.description}}}</p>
        </div>
        <content>
            <div id="items">
                <div v-for="item in articles | orderBy 'publishedAt' -1" class="item">
                    <div class="item-header">
                        <span v-if="item.publishedAt">{{item.publishedAt | dateFromNow}}</span> <span v-if="item.author">by {{item.author}}</span>
                    </div>
                    <div class="item-poster">
                        <div class="item-poster-cover" @click="openLink(item.url)">
                            <button class="btn-icon">
                                <i class="fa fa-link" aria-hidden="true"></i>
                            </button>
                        </div>
                        <img :src="item.urlToImage" alt="{{item.title}}">
                    </div>
                    <div class="item-footer">
                        <p>{{item.title}}</p>
                    </div>
                </div>
            </div>
        </content>
    </main>
</template>

<style lang="scss">
    @import "../scss/variables";

    aside {
        max-width: rem(400);
        background: $secondDark;
        @include display(flex);
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        @include span-columns(3 of 12);
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
            button {
                padding: rem(15);
                cursor: pointer;
                color: $primaryLight;
                text-transform: uppercase;
                width: 100%;
                border: rem(1) solid darken($primaryDark, 3);
                border-left: none;
                border-right: none;
                background: transparent;
                @include transition(background .2s ease-in-out);
                outline: none;
                &:hover {
                    background: darken($primaryDark, 1);
                }
            }
            nav {
                overflow-x: auto;
                max-height: calc(100vh - 137px);
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    li {
                        padding: rem(15);
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @include span-columns(9 of 12);
        header {
            #filters {
                ul {
                    list-style: none;
                    padding: 0;
                    display: inline-table;
                    li {
                        display: table-cell;
                        margin: 0;
                        padding: 6px 15px;
                        background-color: $thirdDark;
                        color: $primaryLight;
                        text-transform: uppercase;
                        &:hover, &.active {
                            background-color: $primaryDark;
                        }
                        &:not(.active) {
                            cursor: pointer;
                        }
                        &:not(:last-child) {
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
        #breadcrumbs {
            h1 {
                color: $primaryDark;
                small {
                    color: #ccc;
                    font-size: rem(18);
                    text-transform: capitalize;
                }
            }
            p {
                color: lighten($primaryDark, 20);
            }
        }
        content {
            flex: 1;
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            align-content: center;
            #items {
                padding: rem(1);
                .item {
                    position: relative;
                    @include span-columns(6);
                    @include omega(2n);
                    border-radius: 3px;
                    box-shadow: 0 0 1px $secondDark;
                    margin-bottom: 15px;
                    background-color: lighten($primaryLight, 5);
                    &-header {
                        position: absolute;
                        font-size: 14px;
                        padding: 2px 5px;
                        background-color: rgba(lighten($primaryLight, 5), .7);
                        border-radius: 3px 0 3px 0;
                    }
                    &-poster {
                        &-cover {
                            opacity: 0;
                            @include transition(opacity .2s ease-in);
                            background-color: rgba(lighten($primaryLight, 5), .3);
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
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
                                    margin-bottom: -2px;
                                }
                                & + button {
                                    margin-left: 5px;
                                }
                            }
                        }
                        &:hover {
                            .item-poster-cover {
                                opacity: 1;
                            }
                        }
                        img {
                            border-radius: 3px 3px 0 0;
                            @include fill-parent;
                            height: 300px;
                            object-fit: cover;
                        }
                    }
                    &-footer {
                        padding: 1px 5px;
                        border-radius: 0 0 3px 3px;
                        p {
                            @include fill-parent;
                            overflow: hidden;
                            display: inline-block;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
    }
</style>

<script>
    export default {
        computed: {
            articles () {
                return this.$store.state.articles
            },
            sources () {
                return this.$store.state.sources
            },
            selectedSource () {
                return this.$store.state.selectedSource
            },
            selectedCategory () {
                return this.$store.state.selectedCategory
            }
        },
        methods: {
            openLink (url) {
                window.open(url, true)
            },
            getArticles (source) {
                this.$store.state.newsResource.getArticles({
                    source: source.id
                }).then((res) => {
                    if (res.body.status === 'ok') {
                        this.$store.state.articles = res.body.articles
                        this.$store.state.selectedSource = source
                    }
                })
            },
            returnToSources () {
                this.$store.state.currentView = 'sources'
            }
        }
    }
</script>
