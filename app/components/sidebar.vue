<template>
    <aside>
        <header>
            <div class="logo">
                LOGO
            </div>
            <nav>
                <ul>
                    <li>Cat 1</li>
                    <li class="active">Cat 2</li>
                    <li>Cat 3</li>
                </ul>
            </nav>
        </header>
        <footer>
            <p class="cp">News source from <a target="_blank" class="js-external-link" href="http://newsapi.org">NewsAPI</a></p>
        </footer>
    </aside>
</template>

<style lang="scss">
    @import "bourbon";
    @import "../scss/variables";

    aside {
        background: $secondDark;
        display: flex!important;;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        header {
            width: 100%;
            .logo {
                height: 90px;
                text-align: center;
            }
            nav {
                ul {
                    list-style: none;
                    padding: 0;
                    li {
                        padding: 15px;
                        cursor: pointer;
                        color: $primaryLight;
                        text-transform: uppercase;
                        @include transition(background .2s ease-in);
                        &:hover, &.active {
                            background: $primaryDark;
                        }
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
                    @include transition(all .2s ease-in);
                    &:hover {
                        color: darken($primaryDark, 5);
                        font-weight: bold;
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
        }
    },
    created () {
        this.$store.state.newsResource.getArticles({source: 'the-next-web'}).then((res) => {
            if (res.body.status === 'ok') {
                this.$store.state.articles = res.body.articles
            }
        })
    }
}
</script>
