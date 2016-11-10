<template>
    <div id="app">
        <sidebar></sidebar>
        <content></content>
    </div>
</template>

<style lang="scss">
    @import "neat";
    @import "./scss/variables";
    body {
        margin: 0;
        padding: 0;
        #app {
            height: 100vh;
            display: flex;
            @include outer-container(100%);
            aside {
                @include span-columns(4);
                max-width: 250px;
                @include media($mobile) {
                    @include span-columns(3);
                }
            }
            content {
                @include pad();
                @include span-columns(8);
                @include omega();
                @include media($mobile) {
                    @include span-columns(8);
                }
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
