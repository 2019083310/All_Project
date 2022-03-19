<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageSearch from '../../../../components/pageSearch/pageSearch.vue'

import {searchFormConfig} from './config/search.config'

export default defineComponent({
  name: 'user',
  components:{
    pageSearch
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
