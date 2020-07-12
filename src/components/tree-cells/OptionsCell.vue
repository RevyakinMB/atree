<template>
  <div class="options-cell__container">
    <span v-if="!edited">
      <span v-if="Array.isArray(value) && value.length">
        {{ value.map((option) => option.name).join(', ') }}
      </span>
      <span v-else>
        &mdash;
      </span>
    </span>
    <select
      v-else
      multiple
      class="options-cell__input"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :selected="selectedOptions[option.id]"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },

    value: {
      type: Array,
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
        return 'options';
      },
    },
  },

  computed: {
    optionsMap() {
      return this.options.reduce((map, option) => ({
        ...map,
        [option.id]: option,
      }), {});
    },

    selectedOptions() {
      const result = this.value.reduce((map, option) => ({
        ...map,
        [option.id]: true,
      }), {});
      return result;
    },
  },

  methods: {
    onChange($event) {
      const { selectedOptions } = $event.target;
      const newValue = Array.prototype.map.call(
        selectedOptions,
        (selectedOption) => this.optionsMap[selectedOption.value],
      );
      this.$parent.$emit('change', {
        value: newValue,
        name: this.propName,
      });
    },
  },
};
</script>

<style lang="less">
  .options-cell__container {
    margin: 5px;
  }

  .options-cell__input {
    width: 100%;
  }
</style>
