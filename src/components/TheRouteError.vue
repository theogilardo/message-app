<template>
  <div class="container">
    <img 
      src="../assets/404.png"
       alt="404 error" 
    />
    <h2>
      {{ $t("error.404") }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style lang="stylus" scoped>

.container
  min-height 100vh
  width 100%
  display flex
  align-items center
  justify-content center
  flex-direction column
  font-family: 'Abril Fatface', cursive;

  img
    width 60rem
    object-fit cover
</style>
