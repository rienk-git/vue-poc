<script setup lang="ts">
import { useImdbStore } from '@/stores/features/imdb/imdb'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const store = useImdbStore()
const route = useRoute()

watch(
  () => route.params.id,
  (newId, _oldId) => {
    console.log(newId, _oldId)
    store.setSelectedImdbId(newId as string)
  }
)

store.setSelectedImdbId(route.params.id as string)
</script>

<template>
  <div class="about">
    <h1>This is a detail imbd page</h1>
    <v-skeleton-loader type="list-item@10" :loading="store.detailFetching" :height="300">
      <pre>{{ store.detailResult }}</pre>
    </v-skeleton-loader>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
