<template>
  <div class="header">
    <main class="hero">
      <div class="hero__text">
        <h3>{{ $t("homepage.communication") }}</h3>
        <h1 v-html="$t('homepage.header')"></h1>
        <p>
          {{ $t("homepage.description") }}
        </p>
        <router-link to="/signup">
          <button class="btn">{{ $t("button.onboarding") }}</button>
        </router-link>
      </div>
      <img 
        src="../assets/cloud-girl.png" 
        alt="cloud girl" 
        class="hero__img" 
      />
    </main>
  </div>
</template>

<script>
export default {
  name: "Homepage",
};
</script>

<style scoped lang="stylus">

.header
  max-width: 1366px;
  width: 85%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

.hero
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 85px auto 0 auto;
  height: 500px;

  &__text
    flex: 1;
    margin-top: -70px;
    display: flex;
    align-items: flex-start
    flex-direction: column

    & > *
      text-align: left;

    h3
      background-image: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1))
      -webkit-background-clip: text
      color: transparent
      letter-spacing: 1px
      font-size: 24px
      margin-bottom -.5rem
      animation slide-up
      animation-duration 2s

    h1
      color: #064e70
      font-size: 54px;
      margin-bottom: 15px;

    p
      font-size: 16px
      font-weight 300
      color: #424242
      padding-right: 150px

    h1, p
      animation fade-in
      animation-duration 2s

  &__img
    width: 460px
    animation: float 6s ease-in-out infinite

.btn
  margin-top: 25px
  padding: 12px 22px
  border: none
  color: white
  background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1))
  border-radius: 15px
  text-transform: uppercase
  font-weight: 700
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2)
  cursor: pointer
  transition: all 0.5s
  animation slide-down
  animation-duration 2s

  &:hover
    transform: translateY(-2px)

span
  position: relative;

span::after
  content: ""
  position: absolute
  top: 0
  left: 0
  transform: translateY(70px);
  width: 100%
  height: 5px
  background: linear-gradient(to right, rgba(74,210,149,1), rgba(77,125,225,1))
</style>
