<template>
  <div class="tree">
    <div class="tree__header">
      <div
        v-for="(column, index) in columns"
        :key="index"
        class="tree__header__item"
        :style="column.width && {
          flexGrow: column.width || 5,
        }"
      >
        {{ column.title || column.name }}
      </div>
    </div>
    <tree-line
      :columns="columns"
    >
      <slot
        v-for="(_, name) in $slots"
        :slot="name"
        :name="name"
      />
    </tree-line>
  </div>
</template>

<script>
import TreeLine from './TreeLine.vue';


export default {
  components: {
    TreeLine,
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  mounted() {
    console.log(this.$slots);
  },

  data() {
    return {
      records: [0, 1, 2, 3, 4, 5],
    };
  },
  methods: {
  },
};
</script>

<style lang="less">
  .tree {
    margin: 5px;
    padding: 10px;
    border: 1px dashed black;
  }

  .tree__header {
    display: flex;
    text-align: center;
  }

  .tree__header__item {
    margin: 5px 0;
    flex: 5 1 1px;
    border: 1px solid chocolate;
  }

  .tree__contents {
    flex: 1 1 1px;
  }
</style>
