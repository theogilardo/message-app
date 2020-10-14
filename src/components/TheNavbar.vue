<template>
  <div class="navbar">
    <img class="navbar__img" src="../assets/logo.png" alt="logo-icon" />
    <div>
      <p>Login</p>
      <p>Signup</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>

.navbar
  border 1px solid red
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  height 5rem
  max-width: 1366px;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);

  &__img
    width: 60px;
    transform: translateX(-7px);

  div
    display: flex;

    & > *
      margin: 0 1rem;
</style>
