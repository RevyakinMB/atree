<template>
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
};
</script>

<style lang="less">
  .tree__header {
    display: flex;
    text-align: center;
  }

  .tree__header__item {
    margin: 5px 0;
    flex: 5 1 1px;
    border: 1px solid chocolate;
  }
</style>
