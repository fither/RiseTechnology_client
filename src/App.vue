<template>
  <div id="app">
    <Topbar />
    <router-view/>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Topbar from '@/components/Topbar.vue';
  import Footer from '@/components/Footer.vue';

  @Component({
    components: {
      Topbar,
      Footer
    }
  })
  export default class App extends Vue {
    created(): void {
      this.$store.dispatch('init');
    }
  }
</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin: 0 4rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    #app {
      margin: 0;
    }
  }

  h4 {
    font-weight: 700 !important;
  }

  .bg-pink {
    background-color: #e83d6d !important;
    color: #FFF !important;
  }

  .bg-yellow {
    background-color: #f1a824 !important;
    color: #FFF !important;
  }

  .bg-blue {
    background-color: #2277e0 !important;
    color: #FFF !important;
  }

  .bg-gray {
    background-color: #e8e8e8 !important;
    color: #a08b87 !important;
  }

  .clr-gray {
    color: #857c7c !important;
  }
</style>
