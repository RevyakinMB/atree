<template>
  <button
    class="tree-action-button"
    :title="tooltip"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },

    tooltip: {
      type: String,
      required: false,
      default() {
        return null;
      },
    },
  },
};
</script>

<style lang="less">
  .tree-action-button {
    background-color: white;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-weight: 600;
    padding: 8px 10px;
    border-radius: 5px;
    margin: 1px;
  }
</style>
