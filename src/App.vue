<template>
    <div id="app">
        <Navigator class="pc"></Navigator>
        <KeywordSearchPC class="pc"></KeywordSearchPC>
        <router-view id="router-view" />
        <Footer class="sp"></Footer>
    </div>
</template>


<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        letter-spacing: 0.015em;
    }

    #router-view {
        margin: auto;
    }

    @media screen and (min-width: 768px) {
        .sp {
            display: none;
        }
        
        #router-view {
            padding: 47px 3vw 0 calc(8vw + 93px);
        }
    }

    @media screen and (max-width: 767px) {
        .pc {
            display: none;
        }

        .container {
            width: 100vw;
        }
        
        a {
            text-decoration: none;
        }
        
        #router-view {
            margin-bottom: 35vw;
        }
    }

</style>


<script>
    import Navigator from '@/components/Navigator.vue'
    import Footer from '@/components/Footer.vue'
    import KeywordSearchPC from '@/components/KeywordSearchPC.vue'

    export default {
        components: {
            Navigator,
            Footer,
            KeywordSearchPC
        }
    }

</script>
