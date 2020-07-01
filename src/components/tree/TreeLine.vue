<template>
  <div
    :style="lineStyle"
    class="tree__line"
  >
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
const MOBILE_MARGIN_MULTIPLIER = 1.5;
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
        if (this.media.isNarrow) {
          return undefined;
        }

        const styles = {};
        if (column.width) {
          styles.flexGrow = column.width;
        }
        if (this.record.depth && index === 0) {
          styles.paddingLeft = `${this.record.depth * DEPTH_MARGIN}px`;
        }
        return Object.keys(styles).length
          ? styles
          : undefined;
      });
    },

    lineStyle() {
      if (!this.media.isNarrow) {
        return undefined;
      }
      return {
        paddingLeft: `${
          this.record.depth * DEPTH_MARGIN * MOBILE_MARGIN_MULTIPLIER
        }px`,
      };
    },

    media() {
      return {
        isNarrow: !this.$screen.wide,
      };
    },
  },

  methods: {
  },
};
</script>

<style lang="less">
  .tree__line {
    display: block;
    border-bottom: 1px solid chocolate;
  }

  @media screen and (min-width: 580px) {
    .tree__line {
      display: flex;
      border-bottom: none;
    }

    .tree__line__item-container {
      margin: 5px 0;
      flex: 5 1 50px;
    }
  }
</style>
