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
    http: {
        headers: {
            'X-Api-Key': 'fa1a73acf8c142ac9e98f05fce988e6e'
        },
        progress: event => {},
        params: { source: 'the-next-web' }
    },
    created () {
        // let vm = this
        this.$http.get(`${this.$store.state.newsApiPath}/articles`).then((res) => {
            if (res.body.status === 'ok') {
                this.$store.state.articles = res.body.articles
            }
        })
    }
}
</script>
