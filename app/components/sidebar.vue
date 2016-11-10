<template>
    <aside>
        Aside
        <nav>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </nav>
    </aside>
</template>

<style lang="scss" scoped>
    @import "bourbon";
    @import "../scss/variables";

    aside {
        background: $primaryBrown;
        nav {
            ul {
                list-style: none;
                padding: 0;
                li {
                    padding: 15px;
                    cursor: pointer;
                    color: lighten($primaryBrown, 20);
                    font-weight: bold;
                    text-transform: uppercase;
                    // text-shadow: 0 1px 1px darken($primaryBrown, 20);
                    @include transition(background .2s $ease-in-back);
                    &:hover {
                        background: darken($primaryBrown, 10);
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
