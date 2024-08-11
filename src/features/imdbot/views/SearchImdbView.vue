<script setup lang="ts">
import { useImdbStore } from '@/stores/features/imdb/imdb'
// import { storeToRefs } from 'pinia's
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { debounceFilter, watchWithFilter } from '@vueuse/core'
import NestedList from '@/components/NestedList.vue'
import { storeToRefs } from 'pinia'

const store = useImdbStore()
const searchString = ref(store.searchString)

const router = useRouter()

const searchRules = [
  (value: string) => {
    if (value) return true

    return 'Name is required.'
  },
  (value: string) => {
    if (value?.length <= 10) return true

    return 'Name must be less than 10 characters.'
  }
]

const update = () => {
  store.updateFirst()
}

// const res = store.resRef
const { resRef } = storeToRefs(store)
const test2 = store.theArrayRef

store.setSomeNestedArray([{ key: 'a' }, { key: 'b' }])

const test = computed(() => {
  return searchString.value + 'lalala'
})

const test3 = store.someArray

// this is nice but no easy debounce possible
// const { searchString } = storeToRefs(store)

watchWithFilter(
  searchString,
  (str: string) => {
    if (str) {
      store.setSearchString(str)
    }
  },
  {
    eventFilter: debounceFilter(500, { maxWait: 1000 })
  }
)
</script>

<template>
  {{ resRef }}
  <button @click="update()">udata</button>
  {{ test2 }}
  {{ test3 }}
  <div class="text-input">
    <v-text-field
      v-model="searchString"
      :counter="10"
      :rules="searchRules"
      label="Search"
      hide-details
      required
    ></v-text-field>
  </div>
  <small v-for="error in store.errors" :key="error">
    {{ error }}
  </small>
  <div>{{ test }}</div>
  <v-skeleton-loader type="list-item@10" :loading="store.fetching" :height="300">
    <v-virtual-scroll :height="300" :items="store.resultList">
      <template v-slot:default="{ item }">
        <v-list-item
          :subtitle="item.Type"
          :title="item.Title"
          @click="router.push({ path: `/imdb/detail/${item.imdbID}` })"
        >
          <template v-slot:prepend>
            <v-icon class="bg-primary">mdi-account</v-icon>
          </template>

          <!-- <template v-slot:append>
            <v-btn icon="mdi-pencil" size="x-small" variant="tonal"></v-btn>
          </template> -->
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-skeleton-loader>

  <NestedList :data="store.resultList"></NestedList>
</template>

<style>
div.text-input {
  min-width: 400px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
