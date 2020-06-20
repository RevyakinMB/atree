<template>
  <div class="tree__line">
    <template
      v-for="(column, index) in columns"
    >
      <slot
        :name="column.name"
        className="tree__line__item"
        :styles="columnStyles[index]"
      />
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
    records: {
      type: Array,
      required: true,
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

  .tree__line__item {
    margin: 5px 0;
    flex: 1 1 1px;
  }
</style>
