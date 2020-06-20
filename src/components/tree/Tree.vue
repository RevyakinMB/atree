<template>
  <div class="tree">
    <div class="tree__header">
      <div
        v-for="(column, index) in columns"
        :key="index"
        class="tree__header__item"
        :style="{
          flexGrow: column.width || 5,
        }"
      >
        {{ column.name }}
      </div>
    </div>
    <tree-line
      :columns="columns"
      :records="records"
    >
      <template v-slot:selector="{ className, styles }">
        <input
          type="checkbox"
          :class="className"
          :style="styles"
        >
      </template>
      <template #name="{ className, styles }">
        <span
          :class="className"
          :style="styles"
        >
          Attribute name
        </span>
      </template>
      <template #types="{ className, styles }">
        <span
          :class="className"
          :style="styles"
        >
          Types are so typical.
        </span>
      </template>
      <template #options="{ className, styles }">
        <span
          :class="className"
          :style="styles"
        >
          Optional options are completely optional.
        </span>
      </template>
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
    // width: 100%;
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
    flex: 1 1 1px;
    border: 1px solid chocolate;
  }

  .tree__contents {
    flex: 1 1 1px;
  }
</style>
