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
      :edited="isBeingEdited(record)"
      :actions-hidden="!!editedRecord"
      @edit="(record) => $emit('edit', record)"
      @add="(record) => $emit('add', record)"
      @remove="(record) => $emit('remove', record)"
      @save="() => $emit('save')"
      @cancel="() => $emit('cancel')"
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

    editedRecord: {
      type: Object,
      required: false,
      default() {
        return null;
      },
    },
  },

  computed: {
    treeNodes() {
      return treeSort(this.records);
    },
  },

  methods: {
    isBeingEdited(record) {
      if (!this.editedRecord) {
        return false;
      }

      const id = record.id || record.localId;
      const editedId = this.editedRecord.id || this.editedRecord.localId;
      return id === editedId;
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
