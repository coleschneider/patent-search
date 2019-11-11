import * as React from 'react'
import * as _ from 'lodash'
import { RouteComponentProps } from 'react-router'
import CompanyList from '../CompanyList/CompanyList'
import { CompanyContext } from '../App'
import Pagination from '../Pagination/Pagination'
import useInput from '../../hooks/useInput/useInput'
import useForm from '../../hooks/useForm/useForm'
import { testValidation, lengthValidation } from '../../utils/validators'
import InputContainer from '../Input/Input'

type Props = RouteComponentProps<{ company: string }>
interface FormState {
  firstName: string
  lastName: string
  company: string
}
function Search(props: Props) {
  const {
    match: { params },
  } = props
  const firstName = useInput('Cole', {
    validations: [lengthValidation, testValidation],
  })
  const lastName = useInput('Schneider', {
    validations: [lengthValidation, testValidation],
  })
  const company = useInput(params.company || '', {
    validations: [testValidation],
  })

  const onSubmit = async ({ values, errors }: { values: FormState }) => {
    props.history.push(`/${values.company}`)
  }
  const form = useForm<FormState>({ firstName, lastName, company }, onSubmit)

  return (
    <>
      <form>
        <h3>Policy Patent Aggregator [BETA 1.0]</h3>
        <InputContainer input={firstName} label="First Name">
          <input type="text" value={firstName.value} onChange={firstName.onChange} onBlur={firstName.onBlur} />
        </InputContainer>
        <InputContainer input={lastName} label="Last Name">
          <input type="text" value={lastName.value} onChange={lastName.onChange} onBlur={lastName.onBlur} />
        </InputContainer>
        <InputContainer input={company} label="Company">
          <input type="text" value={company.value} onChange={company.onChange} onBlur={company.onBlur} />
        </InputContainer>

        <button disabled={!form.isValid} onClick={form.submit} type="submit">
          {form.isValid ? '✅' : '❌'} Submit
        </button>
      </form>
    </>
  )
}

export default Search
