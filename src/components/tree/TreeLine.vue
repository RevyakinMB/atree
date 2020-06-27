<template>
  <div class="tree__line">
    <template
      v-for="(column, index) in columns"
    >
      <div
        :key="column.name"
        :style="columnStyles[index]"
        class="tree__line__item-container"
      >
        <slot :name="column.name" />
      </div>
    </template>
  </div>
</template>

<script>
const DEPTH_MARGIN = 20; // px
export default {
  props: {
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    record: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
    };
  },

  computed: {
    columnStyles() {
      return this.columns.map((column, index) => {
        const styles = {};
        if (column.width) {
          styles.flexGrow = column.width;
        }
        if (this.record.depth && index === 0) {
          // TODO: update flex item width, do not change other items' width
          styles.paddingLeft = `${this.record.depth * DEPTH_MARGIN}px`;
        }
        return Object.keys(styles).length
          ? styles
          : undefined;
      });
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

  .tree__line__item-container {
    margin: 5px 0;
    flex: 5 1 1px;
  }
</style>
