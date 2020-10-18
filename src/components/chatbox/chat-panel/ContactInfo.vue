<template>
  <div class="contact-info">
    <img
      class="contact-info__photo"
      src="../../../assets/theo.png"
      alt="Contact photo"
    />
    <div class="contact-info__name">
      <h2>Theo Gilardo</h2>
      <p>154 messages</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.contact-info
  background beige
  padding 3rem
  grid-row 1/2
  grid-column 3/4
  display flex
  align-items center

  &__photo
    width: 80px;
    height: 80px;
    object-fit cover
    border-radius: 50%;
    margin-right 4rem

  &__name
    display flex
    align-items flex-start
    justify-content center
    flex-direction column
</style>
