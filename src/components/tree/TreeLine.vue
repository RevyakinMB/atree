<template>
  <div class="tree__line">
    <template
      v-for="(column, index) in columns"
    >
      <div
        :key="column.name"
        :style="columnStyles[index]"
        class="tree__line__item-container"
      >
        <slot :name="column.name" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
    };
  },

  computed: {
    columnStyles() {
      return this.columns.map((column) => ({
        flexGrow: column.width || 5,
      }));
    },
  },

  methods: {
  },
};
</script>

<style lang="less">
  .tree__line {
    display: flex;
  }

  .tree__line__item-container {
    margin: 5px 0;
    flex: 1 1 1px;
  }
</style>
