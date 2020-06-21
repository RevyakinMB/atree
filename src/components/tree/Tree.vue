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
      v-for="record in records"
      :key="record.id"
      :columns="columns"
    >
      <slot
        v-for="(_, name) in $scopedSlots"
        :slot="name"
        :name="name"
        :record="record"
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
    records: {
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
