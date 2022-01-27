import { app } from '../main'
import { useValidators } from '../validations/index'

const { validateField } = useValidators()

export const initDirectives = ():void => {
  app.directive('validate', {
    mounted (el) {
      el.addEventListener('change', (e: any) => {
        validateField(e.target.name, e.target.value)
      })
      el.addEventListener('blur', (e: any) => {
        validateField(e.target.name, e.target.value)
      })
    }
  })
}
