<template>
  <span v-if="!edited">
    <span v-if="value">
      {{ value.format(format) }}
    </span>
    <span v-else>
      &mdash;
    </span>
  </span>
  <div v-else>
    <input
      type="date"
      :value="formattedValue"
      @change="onChange"
    >
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
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
      required: true,
    },

    format: {
      type: String,
      required: false,
      default() {
        // TODO: l10n
        return 'DD.MM.YYYY';
      },
    },
  },

  computed: {
    formattedValue() {
      if (!this.value) {
        return null;
      }
      return this.value.format('YYYY-MM-DD');
    },
  },

  methods: {
    onChange($event) {
      const strValue = $event.target.value;
      this.$parent.$emit('change', {
        value: strValue ? moment(strValue, 'YYYY-MM-DD') : null,
        name: this.propName,
      });
    },
  },
};
</script>

<style lang="less">

</style>
