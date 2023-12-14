<template>
  <move>
    <div class="title-wrapper" v-show="show">
      <div class="left">
        <span class="icon-back icon"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-cart icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-person icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more icon"></span>
        </div>
      </div>
    </div>
  </move>
</template>
<script>
import Move from '@/components/Move'
export default {
  name: 'TilteBar',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Move
  }
}
</script>
<style lang="scss" scoped>
.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 101;
  display: flex;
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: #fff;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.13);
  .left {
    flex: 0 0 60px;
    padding-left: 20px;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      display: flex;
      align-items: center;
      width: 40px;
    }
  }
}
</style>
