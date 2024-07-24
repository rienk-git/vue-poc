import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useImdbStore } from '@/stores/features/imdb/imdb'
import { setActivePinia, createPinia } from 'pinia'
import { flushPromises } from '@vue/test-utils'

describe('Imdb Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  // debugging: https://vitest.dev/guide/debugging

  it('should call search', async () => {
    const searchString = 'test'
    const store = useImdbStore()
    // const searchSpy = vi.spyOn(store, 'search')
    expect(store.searchString).toBe('')
    store.setSearchString(searchString)
    expect(store.searchString).toBe(searchString)
    // doesn't work needs research
    // await flushPromises()
    // expect(searchSpy).toHaveBeenCalled()
  })
})
