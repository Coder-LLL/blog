<template>
  <div class="backToTop" @click="handleClick"></div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit("backTop");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "BackToTop";
</style>
