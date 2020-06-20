<template>
  <div id="app">
    <Tree
      :columns="treeColumns"
    />
  </div>
</template>

<script>
import Tree from '@/components/tree/Tree.vue';

export default {
  name: 'App',
  components: {
    Tree,
  },
  data() {
    return {
      treeColumns: [{
        name: 'selector',
        width: 1,
      }, {
        name: 'name',
      }, {
        name: 'types',
      }, {
        name: 'options',
      }],
    };
  },
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

@media screen and (min-width: 900px) {
  #app {
    width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
