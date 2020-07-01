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
    <div
      v-if="!readonly"
      class="tree__line__item-actions"
    >
      <action-button
        text="A"
        tooltip="Add new subrecord"
        @click.native="addHandler"
      />
      <action-button
        text="E"
        tooltip="Edit record"
        @click.native="editHandler"
      />
      <action-button
        text="D"
        tooltip="Delete record"
        @click.native="removeHandler"
      />
    </div>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue';

const DEPTH_MARGIN = 20; // px
const NARROW_MARGIN_MULTIPLIER = 1.5;
export default {
  components: {
    ActionButton,
  },

  props: {
    columns: {
      type: Array,
      required: true,
    },

    record: {
      type: Object,
      required: true,
    },

    readonly: {
      type: Boolean,
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
          this.record.depth * DEPTH_MARGIN * NARROW_MARGIN_MULTIPLIER
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
    addHandler() {
      this.$emit('add', this.record);
    },

    editHandler() {
      this.$emit('edit', this.record);
    },

    removeHandler() {
      this.$emit('remove', this.record);
    },
  },
};
</script>

<style lang="less">
  .tree__line {
    display: block;
    border-bottom: 1px solid chocolate;
    transition: background 0.2s;
  }

  .tree__line:hover {
    background-color: #f5f5f5;
  }

  @media screen and (min-width: 580px) {
    .tree__line {
      display: flex;
      align-items: center;
      border-bottom: none;
      border-radius: 5px;
    }

    .tree__line__item-container {
      margin: 5px 0;
      flex: 5 1 50px;
    }

    .tree__line__item-actions {
      flex: 5 1 50px;
      text-align: center;
    }
  }
</style>
