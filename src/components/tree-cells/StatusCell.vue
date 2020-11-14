<template>
  <div class="status-edit__container">
    <span v-if="!edited">
      <span v-if="value">
        {{ value.name }}
      </span>
      <span v-else>
        &mdash;
      </span>
    </span>
    <select
      v-else
      class="status-edit__input"
      @change="onChange"
    >
      <option value="">
        {{ $t('No status') }}
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
  .status-edit__container {
    margin: 5px;
  }

  .status-edit__input {
    width: 100%;
  }
</style>
