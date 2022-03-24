<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import pageContent from "../../../../components/pagecontent/pageContent.vue";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
  name: "menu",
  components: {
    pageContent,
  },
  setup() {
    return { contentTableConfig };
  },
});
</script>

<style scoped></style>
