<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="role"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import pageSearch from '../../../../components/pageSearch/pageSearch.vue'
import pageContent from '../../../../components/pagecontent/pageContent.vue'

import {searchFormConfig} from './config/search.config'
import {contentTableConfig} from './config/content.config'

export default defineComponent({
  name: 'role',
  components:{
    pageSearch,
    pageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
