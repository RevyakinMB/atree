<template>
  <div class="date-cell__container">
    <span v-if="!edited">
      <span v-if="value">
        {{ value.format(format) }}
      </span>
      <span v-else>
        &mdash;
      </span>
    </span>
    <input
      v-else
      class="date-cell__input"
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
  .date-cell__container {
    margin: 5px;
  }

  .date-cell__input {
    width: 100%;
  }
</style>
