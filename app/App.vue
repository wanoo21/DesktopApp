<template>
    <div id="app">
        <sidebar></sidebar>
        <content></content>
    </div>
</template>

<style lang="scss">
    @import "neat";
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
                width: 230px;
                min-width: 200px;
                margin-right: 25px;
            }
            main {
                flex: 1;
            }
        }
    }
</style>

<script>
  import sidebar from './components/sidebar'
  import content from './components/content'

  export default {
    components: {
      sidebar,
      content
    }
  }

</script>
