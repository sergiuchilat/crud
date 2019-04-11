import ActionUpdate from '@/store/modules/CrudActions/ActionUpdate'
import ActionAdd from '@/store/modules/CrudActions/ActionAdd'
import ActionFetch from '@/store/modules/CrudActions/ActionFetch'
import ActionDelete from '@/store/modules/CrudActions/ActionDelete'

export default {
  modules: {
    ActionFetch,
    ActionAdd,
    ActionUpdate,
    ActionDelete
  }
}
