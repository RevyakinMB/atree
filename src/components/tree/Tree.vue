<template>
  <div class="tree">
    <tree-header :columns="columns" />
    <tree-line
      v-for="record in treeNodes"
      :key="record.id"
      :columns="columns"
      :record="record"
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
import { treeSort } from '@/utils';

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

  computed: {
    treeNodes() {
      return treeSort(this.records);
    },
  },

  methods: {
  },
};
</script>

<style lang="less">
  .tree {
    padding: 10px;
    border: 1px dashed black;
  }

  .tree__contents {
    flex: 1 1 1px;
  }
</style>
