<template>
  <span v-if="value">
    {{ value.format('DD.MM.YYYY') }}
  </span>
  <span v-else>
    &mdash;
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: false,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="less">

</style>