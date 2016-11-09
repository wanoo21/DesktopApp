<template>
    <div id="sidebar">
        <a v-for='article in articles' :href='article.url' class="js-external-link">
            <img :src='article.urlToImage' />
        </a>
    </div>
</template>

<style lang="scss" scoped>
    #sidebar {
        padding: 10px 5px;
        img {
            max-width: 100%;
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
