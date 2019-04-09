<template>
    <div>
      <v-btn icon>
        <img @click="changeLang('ru')" src="../../assets/flags/russia.svg">
      </v-btn>
      <v-btn icon>
        <img @click="changeLang('ro')" src="../../assets/flags/romania.svg">
      </v-btn>
      <v-btn icon>
        <img @click="changeLang('en')" src="../../assets/flags/united-kingdom.svg">
      </v-btn>
    </div>
</template>

<script>
import i18n from '@/plugins/i18n'
export default {
  name: 'LangSwitcher',
  props: ['updateRouter'],
  methods: {
    loadLanguage (lang) {
      import('../../../static/translations/' + lang).then(messages => {
        i18n.setLocaleMessage(lang, messages.default)
      })
    },
    changeLang (value) {
      console.log(value)
      i18n.locale = value
      localStorage.appLang = value
      this.loadLanguage(value)
    }
  },
  created () {
    this.loadLanguage(i18n.locale)
  }
}
</script>

<style scoped>
img {
  height: 30px;
  cursor: pointer;
}
</style>
