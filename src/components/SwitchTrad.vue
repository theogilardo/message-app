<template>
  <div class="chat__switch__trad">
    <a class="chat__switch__trad--en" @click="swithToEnglish">
      <img
        :class="{ 'trad-active': isActive }"
        class="chat__switch__trad__icon"
        src="../assets/flag-us.svg"
        alt="Flag USA"
      />
    </a>
    <a class="chat__switch__trad--fr" @click="swithToFrench">
      <img
        :class="{ 'trad-active': !isActive }"
        class="chat__switch__trad__icon"
        src="../assets/flag-fr.svg"
        alt="Flag FR"
      />
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    swithToEnglish() {
      this.$i18n.locale = "en";
      this.isActive = !this.isActive;
    },
    swithToFrench() {
      this.$i18n.locale = "fr";
      this.isActive = !this.isActive;
    },
  },
};
</script>
