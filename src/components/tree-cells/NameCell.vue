<template>
  <span>
    {{ value }}
  </span>
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
