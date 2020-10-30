<template>
  <div class="chat__category">
    <h3 v-if="listType === 'list-user-messages'" class="chat__category__name">
      {{ listTypeLabel }}
    </h3>
    <h3 v-else class="chat__category__name">
      {{ $t("chat.list.label") }}
    </h3>
  </div>
</template>

<script>
export default {
  computed: {
    listType() {
      return this.$store.getters.listType;
    },
    listTypeLabel() {
      return this.$store.getters.listTypeLabel;
    },
  },
};
</script>
