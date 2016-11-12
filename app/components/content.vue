<template>
    <main>
        <header>
            <div id="filters">
                <ul>
                    <li>Top</li>
                    <li class="active">Latest</li>
                    <li>Popular</li>
                </ul>
            </div>
        </header>
        <div id="breadcrumbs">
            <h1>Title of source or category</h1>
        </div>
        <content>
            <div id="items">
                <div v-for="item in items | orderBy 'publishedAt' -1" class="item">
                    <div class="item-header">
                        <span>{{item.publishedAt | dateFromNow}} by {{item.author}}</span>
                    </div>
                    <div class="item-poster">
                        <div class="item-poster-cover" @click="openLink(item.url)">
                            <button class="btn-icon">
                                <i class="fa fa-link" aria-hidden="true"></i>
                            </button>
                        </div>
                        <img src="{{item.urlToImage}}" alt="{{item.title}}">
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
    @import "neat";
    @import "bourbon";
    @import "../scss/variables";

    main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
        content {
            flex: 1;
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            align-content: center;
            #items {
                @include outer-container(100%);
                padding: 10px;
                .item {
                    position: relative;
                    @include span-columns(3);
                    @include omega(4n);
                    @include res-media(laptop) {
                        @include span-columns(6);
                        @include omega(2n);
                    }
                    @include res-media(laptop-retina) {
                        @include span-columns(4);
                        @include omega(3n);
                    }
                    margin-right: 15px;
                    float: left;
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
                            height: 200px;
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
            items () {
                return this.$store.state.articles
            }
        },
        methods: {
            openLink (url) {
                window.open(url, true)
            }
        }
    }
</script>
