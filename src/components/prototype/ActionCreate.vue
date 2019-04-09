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
      (params.dataURL) && this.loadData(params.dataURL);
      (params.breadcrumb) && this.loadBreadcrumbs()
    },
    loadData (dataURL) {

    },
    onSubmit () {
      this.$store.dispatch('addItems', {
        data: this.form,
        dataURL: this.dataURL
      })
        .then(() => {
          this.toggleForm('hide')
          this.resultStatus = {
            label: 'success.saved',
            class: 'success'
          }
        })
        .catch(() => {
          this.resultStatus = {
            label: 'errors.server',
            class: 'error'
          }
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
      this.resultStatus = {
        label: '',
        class: ''
      }
    }
  },
  mounted () {
    this.initAction({
      dataURL: this.dataURL,
      breadcrumb: true
    })
  }
}
</script>
