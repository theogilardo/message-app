<template>
  <div class="chat__category">
    <h3 
      v-if="listType === 'list-user-messages'" 
      class="chat__category__name"
    >
      {{ listLabel }}
    </h3>
    <h3 
      v-else 
      class="chat__category__name"
    >
      {{ $t("chat.list.label") }}
    </h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["listType", "listLabel"]),
  },
};
</script>
