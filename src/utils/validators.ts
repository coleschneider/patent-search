type ValidationResult = string | void

export const lengthValidation = (value: string): ValidationResult => {
  if (value.length < 4) {
    return 'Must be at least 4 characters'
  }
}

export const testValidation = (value: string): ValidationResult => {
  if (value === 'tes' || value === 'test') {
    return 'Test values not allowed'
  }
}
export const emptyValidation = (value: string): ValidationResult => {
  if (!value) {
    return 'Field must not be blank'
  }
}

export const asyncTruthyValidation = async (value: any): Promise<ValidationResult> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  if (!value) {
    return 'Only truthy values allowed'
  }
}

export const atLeastValidation = (atLeastValue = 0) => (value: number): ValidationResult => {
  if (Number(value) < atLeastValue) {
    return `Must be at least ${atLeastValue}`
  }
}
