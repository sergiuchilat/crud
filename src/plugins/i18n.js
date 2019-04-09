import Vue from 'vue'
import VueI18n from 'vue-i18n'
/* import localesEN from '../../static/translations/en'
import localesRO from '../../static/translations/ro'
import localesRU from '../../static/translations/ru' */

Vue.use(VueI18n)

const messages = {
}

const i18n = new VueI18n({
  locale: localStorage.appLang || 'en', // set locale
  fallbackLocale: localStorage.appLang || 'en', // set fallback locale
  messages // set locale messages
})

export default i18n
