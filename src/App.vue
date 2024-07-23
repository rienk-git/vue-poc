<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, watch } from 'vue'

const items = [
  {
    title: 'Home',
    value: '/'
  },
  {
    title: 'About',
    value: '/about'
  },
  {
    title: 'Search',
    value: '/imdb/search'
  }
]

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
  drawer.value = false
})
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template> -->

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list>
          <v-list-item
            v-for="n in items"
            :key="n.value"
            :title="n.title"
            :to="n.value"
            link
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped></style>
<style>
div.v-list-item__content {
  padding-left: 10px;
}
</style>
