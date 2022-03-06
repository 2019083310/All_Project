<template>
  <div @click='itemClick' class='tab-bar-item'>
    <div v-if='!isActive'>
      <slot name='item-icon'></slot>
    </div>
    <div v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <div :style='activeStyle'>
      <slot name='item-text'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    data() {
      return {

      }
    },
    props: {
      path:String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){
        return this.isActive?{color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.path)
      }
    },
  }

</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .tab-bar-item img{
    width:24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 3px;
    margin-bottom: 2px;
  }
</style>
