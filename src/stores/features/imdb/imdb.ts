import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { ImdbApi } from './api'
import type { CombinedResult } from './types/apiTypes'

const imdbApi = new ImdbApi()
type SomeArray = { key: string }[]
export const useImdbStore = defineStore('imdbData', () => {
  const result = ref<CombinedResult>({ Response: '' })
  const resRef = computed(() => result.value?.Search ?? [])
  const someArray = ref<SomeArray>([{ key: 'g' }])
  const detailResult = ref<CombinedResult>({ Response: '' })
  const searchString = ref<string>('')
  const fetching = ref<boolean>(false)
  const detailFetching = ref<boolean>(false)
  const errors = ref<string[]>([])
  const resultList = computed(() => result.value?.Search ?? [])
  const theArrayRef = computed(() => someArray.value ?? [])
  const selectedId = ref<string | null>(null)
  const selectedItem = computed(() =>
    result.value?.Search?.find((item) => item.imdbID === selectedId.value)
  )
  function setSelectedItem(imdbId: string) {
    selectedId.value = imdbId
  }

  function setSearchString(val: string) {
    searchString.value = val
  }

  function setSelectedImdbId(val: string) {
    selectedId.value = val
  }

  const setSomeNestedArray = (val: SomeArray) => {
    someArray.value = val
  }

  async function getByImdbId(id: string) {
    detailFetching.value = true
    try {
      const res = await imdbApi.searchImdbById(id)
      detailResult.value = res
    } catch (e: unknown) {
      detailFetching.value = false
      if (typeof e === 'string') {
        errors.value = [e]
      } else {
        errors.value = ['Unknown Error']
      }
    }
    detailFetching.value = false
  }

  async function search(searchString: string) {
    fetching.value = true
    try {
      const res = await imdbApi.searchImdb(searchString)
      result.value = res
    } catch (e: unknown) {
      fetching.value = false
      if (typeof e === 'string') {
        errors.value = [e]
      } else {
        errors.value = ['Unknown Error']
      }
    }
    fetching.value = false
  }
  const updateFirst = () => {
    //result.value.testObject = { some: 'data22' }
    if (result.value.Search?.length) {
      result.value.Search[0].Title = 'updated title!'
    }
  }

  watch(searchString, async (str) => {
    search(str)
  })

  watch(selectedId, async (str) => {
    getByImdbId(str ?? '')
  })

  return {
    result,
    selectedId,
    selectedItem,
    setSelectedItem,
    resultList,
    errors,
    searchString,
    search,
    fetching,
    setSearchString,
    setSelectedImdbId,
    detailResult,
    detailFetching,
    setSomeNestedArray,
    theArrayRef,
    someArray,
    updateFirst,
    resRef
  }
})
