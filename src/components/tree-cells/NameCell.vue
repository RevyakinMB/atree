<template>
  <div class="name-cell">
    <span v-if="!edited">
      {{ value }}
    </span>
    <input
      v-else
      type="text"
      class="name-cell-edit-input"
      :value="value"
      @input="onChange"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default() {
        return null;
      },
    },

    edited: {
      type: Boolean,
      required: true,
    },

    propName: {
      type: String,
      required: false,
      default() {
        return 'name';
      },
    },
  },
  data() {
    return {
    };
  },

  methods: {
    onChange($event) {
      console.log(this.$parent, $event);
      this.$parent.$emit('change', {
        value: $event.target.value,
        name: this.propName,
      });
    },
  },
};
</script>

<style lang="less">
  .name-cell {
    margin: 5px;
  }

  .name-cell-edit-input {
    width: 100%;
  }
</style>
