import { ElLoading } from 'element-plus'
import { merge } from 'lodash'

export default {
  show(options) {
    options = merge(options, { background: 'rgba(0, 0, 0, 0)' })
    return ElLoading.service(options)
  },
  close(instance) {
    try {
      if (instance) {
        instance.close()
      }
    } catch (e) {
      console.error(e)
    }
  },
}
