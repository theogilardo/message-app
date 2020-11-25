<template>
  <div>
    <the-navbar></the-navbar>
    <slot/>
    <switch-language position="bottom" />
  </div>
</template>


<script>
import SwitchLanguage from '../SwitchLanguage.vue'
import TheNavbar from '../TheNavbar.vue'

export default {
  name: "LayoutDefault",
  components: {
    TheNavbar,
    SwitchLanguage,
  }
}
</script>