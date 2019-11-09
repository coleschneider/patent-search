import React from 'react'

type Validation = (value: any) => Promise<ValidationResult> | ValidationResult

interface UseInputOptions {
  validations?: Validation[]
}

function useInput<T extends any>(initial: T, { validations = [] }: UseInputOptions) {
  const [value, setValue] = React.useState<T>(initial)
  const [errors, setErrors] = React.useState<string[]>([])
  const [touched, setTouched] = React.useState(false)
  const [isValidating, setIsValidating] = React.useState(false)

  const onChange = React.useCallback(e => {
    if (e.target.type === 'checkbox') {
      setValue(e.target.checked)
    } else {
      setValue(e.target.value)
    }
  }, [])

  React.useEffect(() => {
    const handlErrors = async () => {
      setIsValidating(true)
      const newErrors: string[] = []
      await Promise.all(
        validations.map(async validation => {
          const result = await validation(value)
          if (result) {
            newErrors.push(result)
          }
        }),
      )
      setErrors(newErrors)
      setIsValidating(false)
    }
    handlErrors()
  }, [value])

  const isValid = errors.length === 0

  return {
    value,
    setValue,
    errors,
    setErrors,
    clear: React.useCallback(() => {
      if (typeof initial === 'string') {
        setValue('' as any)
      }
    }, []),
    reset: React.useCallback(() => setValue(initial), []),
    onChange,
    touched,
    onBlur: React.useCallback(() => {
      setTouched(true)
    }),
    setTouched,
    isValid,
    isValidating,
  }
}
export default useInput
