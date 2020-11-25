<template>
  <div>
    <div class="background-chat"></div>
    <slot/>
    <switch-language position="top" />
  </div>
</template>


<script>
import SwitchLanguage from '../SwitchLanguage'

export default {
  name: "LayoutChat",
  components: {
    SwitchLanguage
  }
}
</script>

<style lang="stylus" scoped>

.background-chat
  background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1));
  position absolute
  top 0 
  left 0
  width 400px
  height 100%

</style>