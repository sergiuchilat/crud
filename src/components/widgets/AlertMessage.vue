<template>
  <div class="pos">
    <div v-if="showAlert">
      <v-alert
              :value="resultStatus.label !== ''"
              :type="resultStatus.class"
              transition="slide-y-reverse-transition"
              v-show="resultStatus.label==='errors.server'"
      >
        {{$t('responseMessages.errors.server')}}
      </v-alert>
      <v-alert
              v-show="resultStatus.label==='success.saved'"
              value="resultStatus.label !== ''"
              :type="resultStatus.class"
              transition="slide-y-reverse-transition"
      >
        {{$t('responseMessages.success.saved')}}
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    label: {
      type: String
    },
    alertClass: {
      type: String
    },
    resultStatus: Object
  },
  data () {
    return {
      showAlert: false
    }
  },
  watch: {
    resultStatus: function () {
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
  .pos {
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 32423;
  }
</style>
