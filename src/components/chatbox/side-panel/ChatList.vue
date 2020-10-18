<template>
  <div class="chat-list">
    <div class="chat-list__box">
      <img
        class="chat-list__box__photo"
        src="../../../assets/theo.png"
        alt="Contact photo"
      />
      <div class="chat-list__box__name">
        <h4>Theo Gilardo</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit rerum voluptatibus <br />
          nemo eveniet laboriosam enim!
        </p>
      </div>
    </div>
    <div class="chat-list__box">
      <img
        class="chat-list__box__photo"
        src="../../../assets/theo.png"
        alt="Contact photo"
      />
      <div class="chat-list__box__name">
        <h4>Theo Gilardo</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit rerum voluptatibus <br />
          nemo eveniet laboriosam enim!
        </p>
      </div>
    </div>
    <div class="chat-list__box">
      <img
        class="chat-list__box__photo"
        src="../../../assets/theo.png"
        alt="Contact photo"
      />
      <div class="chat-list__box__name">
        <h4>Theo Gilardo</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit rerum voluptatibus <br />
          nemo eveniet laboriosam enim!
        </p>
      </div>
    </div>
    <div class="chat-list__box">
      <img
        class="chat-list__box__photo"
        src="../../../assets/theo.png"
        alt="Contact photo"
      />
      <div class="chat-list__box__name">
        <h4>Theo Gilardo</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit rerum voluptatibus <br />
          nemo eveniet laboriosam enim!
        </p>
      </div>
    </div>
    <div class="chat-list__box">
      <img
        class="chat-list__box__photo"
        src="../../../assets/theo.png"
        alt="Contact photo"
      />
      <div class="chat-list__box__name">
        <h4>Theo Gilardo</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit rerum voluptatibus <br />
          nemo eveniet laboriosam enim!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>


.chat-list
  background #333
  grid-row 3/5
  grid-column 2/3

  &__box
    background beige
    height 100px
    padding 2rem
    border-top 1px solid #333
    border-bottom 1px solid #333
    display flex
    align-items center

    &__photo
      width: 60px;
      height: 60px;
      object-fit cover
      border-radius: 50%;
      margin-right 2rem

    &__name
      display flex
      align-items flex-start
      justify-content center
      flex-direction column

      h4
        margin-bottom .5rem

      p
        font-size .8rem
        text-align left
</style>
