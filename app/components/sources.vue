<template>
    <main>
        <header>
            <div id="input-filter">
                <input type="search" v-model="filterSources" placeholder="Search in sources">
            </div>
        </header>
        <content>
            <div id="sources">
                <div v-for="source in sources | filterBy filterSources 'name'" transition="fade" class="source">
                    <div class="source-content">
                        <img :src="source.urlsToLogos.medium">
                        <div class="source-cover">
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        header {
            #input-filter {
                padding-right: 10px;
                margin: 20px 0 10px;
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
                padding: 1px;
                .source {
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
                    height: 150px;
                    margin-right: 15px;
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
            }
        }
    }
</script>
