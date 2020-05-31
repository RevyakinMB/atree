<template>
  <div>
    <div>
      <button
        @click="increment"
      >
        Press me to increment the counter
      </button>
    </div>
    <div>
      <span>
        Current counter value:
        {{ counter }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment() {
      this.counter += 1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
