<script>
import Action from '@/components/prototype/Action'

export default {
  name: 'ActionCreate',
  extends: Action,
  data () {
    return {
      showForm: true
    }
  },
  components: {
  },
  methods: {
    initAction (params) {
      (params.moduleName) && this.loadData(params.moduleName);
      (params.breadcrumb) && this.loadBreadcrumbs()
    },
    loadData (moduleName) {

    },
    onSubmit () {
      this.$store.dispatch('addItems', {
        data: this.form,
        moduleName: this.moduleName
      })
        .then(() => {
          this.toggleForm('hide')
          this.$store.dispatch('setAlertStatus', {
            label: 'success.saved',
            class: 'success'
          })
        })
        .catch(() => {
          this.$store.dispatch('setAlertStatus', {
            label: 'errors.server',
            class: 'error'
          })
        })
    },
    toggleForm (status) {
      this.showForm = status === 'show'
    },
    resetForm () {
      for (let key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = ''
        }
      }
      this.$v.$reset()
      this.toggleForm('show')
    }
  },
  mounted () {
    this.initAction({
      moduleName: this.moduleName,
      breadcrumb: true
    })
  }
}
</script>
