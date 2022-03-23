<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleSearchClick"
      @resetBtnClick='handleResetClick'
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";

import pageSearch from "../../../../components/pageSearch/pageSearch.vue";
import pageContent from "../../../../components/pagecontent/pageContent.vue";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

import { useSearchPage } from "../../../../hooks/use-search-page";

export default defineComponent({
  name: "user",
  components: {
    pageSearch,
    pageContent,
  },
  setup() {
    const [pageContentRef, handleResetClick, handleSearchClick] = useSearchPage();

    return {
      searchFormConfig,
      contentTableConfig,
      handleSearchClick,
      pageContentRef,
      handleResetClick
    };
  },
});
</script>

<style scoped lang="less"></style>
