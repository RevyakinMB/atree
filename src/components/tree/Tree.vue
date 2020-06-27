<template>
  <div class="tree">
    <tree-header :columns="columns" />
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
import TreeHeader from './TreeHeader.vue';

export default {
  components: {
    TreeLine,
    TreeHeader,
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

  .tree__contents {
    flex: 1 1 1px;
  }
</style>
