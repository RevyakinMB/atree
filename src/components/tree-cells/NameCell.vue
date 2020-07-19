<template>
  <div
    class="name-cell"
    :class="nameIsValid ? '' : 'name-cell_invalid'"
  >
    <span v-if="!edited">
      {{ value }}
    </span>
    <input
      v-else
      type="text"
      class="name-cell__edit-input"
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

    record: {
      type: Object,
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

    isValid: {
      type: Function,
      required: false,
      default() {
        return () => true;
      },
    },
  },

  computed: {
    nameIsValid() {
      return this.isValid(this.value, this.record);
    },
  },

  mounted() {
    this.$parent.$emit('isValid', {
      value: this.isValid(this.value, this.record),
      name: this.propName,
    });
  },

  methods: {
    onChange($event) {
      this.$parent.$emit('change', {
        value: $event.target.value,
        name: this.propName,
      });

      this.$parent.$emit('isValid', {
        value: this.isValid($event.target.value, this.record),
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

  .name-cell_invalid {
    background-color: red;
  }

  .name-cell__edit-input {
    width: 100%;
  }
</style>
