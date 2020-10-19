<template>
  <div>
    <div v-for="user in users" :key="user.id" class="chat__user">
      <img src="../assets/theo.png" alt="Main Profile Photo" />
      <!-- <img :src="user.profilePic" alt="Main Profile Photo" /> -->
      <div>
        <h2>{{ user.name }} {{ user.surname }}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <h3>14:56</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          name: "Theo",
          surname: "MSG",
        },
        {
          name: "John",
          surname: "Doe",
        },
        {
          name: "Maria",
          surname: "Vex",
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped></style>
