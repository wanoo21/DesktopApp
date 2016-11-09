<template>
    <div id="sidebar">
        {{articles | json}}
    </div>
</template>

<style lang="scss" scoped>
    #sidebar {
        padding: 10px 5px;
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
        }
    },
    created () {
        // let vm = this
        this.$http.get(`${this.$store.state.newsApiPath}/articles`, { params: { source: 'the-next-web' } }).then((res) => {
            if (res.body.status === 'ok') {
                this.$store.state.articles = res.body.articles
            }
        })
    }
}
</script>
