import {reactive, toRefs} from "vue"

const state = reactive({
  from: 'auto',
  to: 'zh',
})

export function useTranslateStore() {
  return {
    ...toRefs(state),
  }
}
