<script setup lang="ts">
import type { CombinedResult } from './../stores//features/imdb/types/apiTypes'

defineProps<{
  data: CombinedResult['Search'][]
}>()
</script>

<template>
  yolo1
  <div>data: {{ data }}</div>
</template>

<style scoped></style>
