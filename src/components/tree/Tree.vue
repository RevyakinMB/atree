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
      :actions-hidden="actionsAreHidden"
      @add="recordAddHandler"
      @remove="recordRemoveHandler"
      @cancel="cancelEditingHandler"
      @save="recordSaveHandler"
      @edit="recordEditHandler"
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
import { v4 as uuid } from 'uuid';

import { dfs, getVertexChildren, treeSort } from '@/utils';

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
      data: [],
      recordBeingAdded: null,
      recordBeingEdited: null,
    };
  },

  computed: {
    treeNodes() {
      return treeSort(this.data);
    },

    editedRecord() {
      return this.recordBeingEdited || this.recordBeingAdded;
    },

    actionsAreHidden() {
      return !!this.editedRecord;
    },
  },

  watch: {
    records(val) {
      this.data = val;
      this.recordBeingAdded = null;
      this.recordBeingEdited = null;
    },
  },

  mounted() {
    this.data = [...this.records];
  },

  methods: {
    isBeingEdited(record) {
      if (!this.editedRecord || !record) {
        return false;
      }

      const id = record.id || record.localId;
      const editedId = this.editedRecord.id || this.editedRecord.localId;
      return id === editedId;
    },

    recordAddHandler(record) {
      if (this.editedRecord) {
        throw new Error('Another record is currently being edited.');
      }

      const localId = uuid();
      const newRecord = { localId };

      if (record) {
        if (record.id) {
          newRecord.parent = record.id;
        } else if (record.localId) {
          newRecord.localParent = record.localId;
        } else {
          throw new Error('A record without id is provided.');
        }
      }

      this.recordBeingAdded = newRecord;
      this.data.push(newRecord);
    },

    recordEditHandler(record) {
      if (this.editedRecord) {
        throw new Error('Another record is currently being edited.');
      }

      this.recordBeingEdited = { ...record };
    },

    recordSaveHandler() {
      if (!this.editedRecord) {
        throw new Error('No record is currently being edited.');
      }

      const editedId = this.editedRecord.id || this.editedRecord.localId;
      const index = this.data.findIndex((record) => (
        record.id === editedId || record.localId === editedId));
      if (index === -1) {
        throw new Error('A record being edited is not found.');
      }
      this.data.splice(index, 1, this.editedRecord);
      this.recordBeingAdded = null;
      this.recordBeingEdited = null;
    },

    cancelEditingHandler() {
      if (!this.editedRecord) {
        throw new Error('No record is currently being edited.');
      }

      if (this.recordBeingAdded) {
        this.data = this.data.filter((record) => ((
          record.id && record.id !== this.recordBeingAdded.id
        ) || (
          record.localId && record.localId !== this.recordBeingAdded.localId
        )));
        this.recordBeingAdded = null;
      }
      this.recordBeingEdited = null;
    },

    recordRemoveHandler(record) {
      if (this.recordBeingAdded) {
        throw new Error('Removing is forbidden while editing a record.');
      }

      const victims = dfs(
        record.id || record.localId,
        getVertexChildren(this.data),
      );
      const victimsMap = victims.reduce((result, victim) => ({
        ...result,
        [victim.id]: victim.id,
      }), {});

      this.data = this.data.filter(
        (testee) => !victimsMap[testee.id || testee.localId],
      );
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
