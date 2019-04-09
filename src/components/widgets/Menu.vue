<template>
  <div>
        <v-toolbar color="grey darken-1" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-menu :nudge-width="100">
            <template v-slot:activator="{ on }">
              <v-toolbar-title v-on="on">
              <span @click="$router.push('/')">{{$t('homeLinkText')}}</span>
            </v-toolbar-title>
            </template>
          </v-menu>

          <v-menu :nudge-width="100">
            <template v-slot:activator="{ on }">
              <v-toolbar-title v-on="on">
                <span>Authors</span>
                <v-icon dark>arrow_drop_down</v-icon>
              </v-toolbar-title>
            </template>

            <v-list>
              <v-list-tile to="/authors/create">
                <v-list-tile-title>
                  Create
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile to="/authors/list">
                <v-list-tile-title>
                  List
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-menu :nudge-width="100">
            <template v-slot:activator="{ on }">
              <v-toolbar-title v-on="on">
                <span>Books</span>
                <v-icon dark>arrow_drop_down</v-icon>
              </v-toolbar-title>
            </template>

            <v-list>
              <v-list-tile to="/books/create">
                <v-list-tile-title>
                  Create
                </v-list-tile-title>
              </v-list-tile>
              <v-list-tile to ="/books/list">
                <v-list-tile-title>
                  List
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>
          <v-layout align-self-center justify-end>
            <lang-switcher />
          </v-layout>
        </v-toolbar>
  </div>
</template>

<script>
import LangSwitcher from '@/components/widgets/LangSwitcher'
export default {
  components: {
    LangSwitcher
  }
}
</script>

<style scoped>
  span {
    cursor: pointer;
  }
</style>
