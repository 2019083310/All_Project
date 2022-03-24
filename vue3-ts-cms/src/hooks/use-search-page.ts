import { ref, onMounted } from 'vue'

import pageContent from '../components/pageSearch/pageSearch.vue'

export function useSearchPage() {
  const pageContentRef = ref()

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleSearchClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, handleResetClick, handleSearchClick]
}
