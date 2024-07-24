import { endpoint } from '../config'
import type { CombinedResult } from '../types/apiTypes'

export class ImdbApi {
  private abortController = new AbortController()
  private abortController2 = new AbortController()
  private isFetching = false
  private isFetchingDetail = false
  async searchImdb(searchString: string) {
    if (this.isFetching) {
      this.abortController.abort()
      this.abortController = new AbortController()
    }
    this.isFetching = true
    try {
      const res = await fetch(`${endpoint}&s=${searchString}`, {
        signal: this.abortController.signal
      })
      this.isFetching = false
      if (!res.ok) throw res.statusText
      return res.json() as Promise<CombinedResult>
    } catch (e) {
      this.isFetching = false
      throw 'Unknown error'
    }
  }

  async searchImdbById(id: string) {
    if (this.isFetchingDetail) {
      this.abortController2.abort()
      this.abortController2 = new AbortController()
    }
    this.isFetchingDetail = true
    try {
      const res = await fetch(`${endpoint}&i=${id}`, {
        signal: this.abortController2.signal
      })
      this.isFetchingDetail = false
      if (!res.ok) throw res.statusText
      return res.json() as Promise<CombinedResult>
    } catch (e) {
      this.isFetchingDetail = false
      throw 'Unknown error'
    }
  }
}
