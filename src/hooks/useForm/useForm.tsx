import React from 'react'
import { isEqual } from 'lodash'
import useInput from '../useInput/useInput'

type FormValues = {
  [key: string]: any
}

type FormErrors = {
  [key: string]: string[]
}

interface FormProps {
  [key: string]: ReturnType<typeof useInput>
}
function useForm<T>(inputs: FormProps = {}, onSubmit) {
  const [errors, setErrors] = React.useState<FormValues>({})
  const [values, setValues] = React.useState<FormErrors>({})

  React.useEffect(() => {
    const newValues: FormValues = {}
    const newErrors: FormErrors = {}
    // @ts-ignore
    Object.entries(inputs).forEach(([k, v]) => {
      newValues[k] = v.value
      newErrors[k] = v.errors
    })
    if (!isEqual(values, newValues)) setValues(newValues)
    if (!isEqual(errors, newErrors)) setErrors(newErrors)
  })

  // @ts-ignore
  const isValidating = Object.values(inputs).some(input => input.isValidating)
  const isValid =
    // @ts-ignore
    !isValidating && Object.values(inputs).every(input => input.isValid)

  return {
    submit: e => {
      e.preventDefault()
      onSubmit({ values, errors } as { values: T; errors: any })
    },
    values,
    errors,
    isValid,
    isValidating,
    reset: React.useCallback(() => {
      // @ts-ignore
      Object.values(inputs).forEach(input => input.reset())
    }),
    clear: React.useCallback(() => {
      // @ts-ignore
      Object.values(inputs).forEach(input => input.clear())
    }),
  }
}
export default useForm
