<template>
  <div id="nav">
    <template
      v-for="(link, index) in links"  
    >
      <router-link 
        :to="link.url"
        :key="index"
      >
        {{ link.name }}
      </router-link> {{ index !== links.length - 1 ? '|' : '' }}
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  export interface INavLink {
    name: string,
    url: string
  }

  @Component({})
  export default class Navigation extends Vue {
    links: INavLink[] = [];

    created(): void {
      this.links = [
        {
          name: 'İş Listesi',
          url: '/'
        }, {
          name: 'İş Ekle',
          url: '/job-add'
        }
      ]
    }
  }
</script>

<style>
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>