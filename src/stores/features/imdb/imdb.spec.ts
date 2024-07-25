import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useImdbStore } from '@/stores/features/imdb/imdb'
import { setActivePinia, createPinia } from 'pinia'
import { flushPromises } from '@vue/test-utils'
import { ImdbApi } from './api'

describe('Imdb Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  // debugging: https://vitest.dev/guide/debugging

  it('should trigger search', async () => {
    const searchString = 'test'
    const store = useImdbStore()
    const mock = vi.spyOn(ImdbApi.prototype, 'searchImdb')
    expect(store.searchString).toBe('')
    store.setSearchString(searchString)
    expect(store.searchString).toBe(searchString)
    await flushPromises()
    expect(mock).toHaveBeenCalled()
  })
})
