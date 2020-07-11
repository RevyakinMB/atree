<template>
  <span v-if="!edited">
    <span v-if="value">
      {{ value.name }}
    </span>
    <span v-else>
      &mdash;
    </span>
  </span>
  <div v-else>
    <select
      @change="onChange"
    >
      <option value="">
        No status
      </option>
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :selected="value && option.id === value.id"
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
        return 'status';
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
  },

  methods: {
    onChange($event) {
      const { value } = $event.target;
      const newValue = value ? this.optionsMap[value] : null;
      this.$parent.$emit('change', {
        value: newValue,
        name: this.propName,
      });
    },
  },
};
</script>

<style lang="less">

</style>
