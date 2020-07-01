<template>
  <div class="tree">
    <tree-header
      :columns="columns"
      :readonly="readonly"
    />
    <tree-line
      v-for="record in treeNodes"
      :key="record.id || record.localId"
      :columns="columns"
      :record="record"
      :readonly="readonly"
      @edit="recordEditHandler"
      @add="recordAddHandler"
      @remove="recordRemoveHandler"
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

    readonly: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
  },

  data() {
    return {
      editedRecord: null,
    };
  },

  computed: {
    treeNodes() {
      return treeSort(this.records);
    },
  },

  methods: {
    recordEditHandler(record) {
      if (!record) {
        throw new Error('Illegal argument exception.');
      }
      if (this.editedRecord) {
        throw new Error('Another record is currently being edited.');
      }
      this.editedRecord = record;
    },

    recordAddHandler(record) {
      if (!record) {
        throw new Error('Illegal argument exception.');
      }
      if (this.editedRecord) {
        throw new Error('Another record is currently being edited.');
      }

      this.$emit('add', record);
    },

    recordRemoveHandler(record) {
      // TODO: Vuex
      this.$emit('remove', record);
    },
  },
};
</script>

<style lang="less">
  .tree {
    padding: 10px;
    border: 1px dashed black;
  }
</style>
