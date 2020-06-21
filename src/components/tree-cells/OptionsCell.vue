<template>
  <span v-if="Array.isArray(value) && value.length">
    {{ value.map((option) => option.name).join(', ') }}
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
