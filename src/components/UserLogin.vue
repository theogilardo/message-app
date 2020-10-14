<template>
  <div class="container">
    <form class="container__form">
      <h2>Please Login</h2>
      <input type="email" placeholder="Enter email.." />
      <input type="email" placeholder="phone.." />
      <button class="btn">Signup</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>

.container
  width 100%
  min-height 100vh
  display flex
  align-items center
  justify-content center

  &__form
    height 40rem
    width 50%
    max-width 55rem
    border-radius 20px
    background-image linear-gradient(to right, #4c7de0, #e69cc0)
    display flex
    align-items center
    justify-content center
    flex-direction column

    h2
      margin 1.5rem
      color white

    input
      padding 1.5rem
      border none
      border-radius 5px
      width 55%

      &:not(:first-child)
        margin-top 2rem

    .btn
      margin-top: 3.5rem;
      font-size 1.6rem
      padding: 1.5rem 2.5rem;
      border: none;
      color: white;
      background-color: #5ba95b;
      border-radius: 15px;
      text-transform: uppercase;
      font-weight: 700;
      box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: all 0.5s;

      &:hover
        transform: translateY(-2px);
</style>
