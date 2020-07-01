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
      <span class="tree__header__item__index">
        {{ `${index + 1}.` }}
      </span>
      <span class="tree__header__item__text">
        {{ column.title || column.name }}
      </span>
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
    display: block;
    border-bottom: 1px solid chocolate;
  }

  .tree__header__item {
    display: inline-block;
    margin-right: 10px;
  }

  @media screen and (min-width: 580px) {
    .tree__header {
      display: flex;
      text-align: center;
    }

    .tree__header__item {
      display: block;
      margin: 5px 0;
      flex: 5 1 50px;
    }

    .tree__header__item__index {
      display: none;
    }
  }
</style>
