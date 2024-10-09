<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="changeMessage">Change Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello from Vue!'
    };
  },
  methods: {
    changeMessage() {
      this.message = 'Message Changed!';
    }
  }
};
</script>

<style>
h1 {
  color: blue;
}
</style>
