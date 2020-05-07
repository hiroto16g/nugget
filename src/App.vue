<template>
    <div id="app">
        <Header class="pc"></Header>
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
            width: 1500px;
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
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'

    export default {
        components: {
            Header,
            Footer
        }
    }

</script>
