<template>
  <div class="header">
    <main class="hero">
      <div class="hero__text">
        <h3>Talk. Chat. Collaborate.</h3>
        <h1>
          Communicate
          <span>Easily</span>
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam,
          tempore! Voluptate sunt temporibus atque debitis fugit amet optio
          eligendi libero ullam est? Mollitia, adipisci laudantium.
        </p>
        <router-link to="/signup">
          <button class="btn">Get Started</button>
        </router-link>
      </div>
      <img src="../assets/cloud-girl.png" alt="cloud girl" class="hero__img" />
    </main>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped lang="stylus">
.header
  max-width: 1366px;
  width: 85%;
  min-height: 100vh;
  // height 100%
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

.hero
  display: flex;
  align-items: center;
  justify-content: space-around;
  // width: 90%;
  margin: 85px auto 0 auto;
  height: 500px;

  &__text
    flex: 1;
    margin-top: -70px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    & > *
      text-align: left;

    h3
      color: #e69cc0;
      font-size: 24px;

    h1
      color: #064e70;
      font-size: 54px;
      margin-bottom: 25px;

    p
      font-size: 16px;
      color: #959393;
      padding-right: 40px;

  &__img
    width: 100px;
    flex: 1;

.btn
  margin-top: 25px;
  padding: 12px 22px;
  border: none;
  color: white;
  background-image: linear-gradient(to right, #4c7de0, #e69cc0);
  border-radius: 15px;
  text-transform: uppercase;
  font-weight: 700;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.5s;

  &:hover
    transform: translateY(-2px);

span
  position: relative;

span::after
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(70px);
  width: 100%;
  height: 5px;
  background-color: #e69cc0;
</style>
