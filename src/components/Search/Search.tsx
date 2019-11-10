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

function Search(props: Props) {
  const [currentQuery, setQuery] = React.useState('')
  const { getCompaniesByName, state } = CompanyContext()
  const { companies, companySearches } = state
  const { isFetching, assignees, page, count } = companies
  const firstName = useInput('Cole', {
    validations: [lengthValidation, testValidation],
  })
  const lastName = useInput('Schneider', {
    validations: [lengthValidation, testValidation],
  })
  const company = useInput('salesforce', {
    validations: [testValidation],
  })

  const onSubmit = async ({ values, errors }) => {
    setQuery(values.company)
    await getCompaniesByName(values.company, page)
  }
  const form = useForm({ firstName, lastName, company }, onSubmit)

  const onGoPage = (num: number) => {
    fetchData(currentQuery, num)
  }
  console.log(state)
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

        <button disabled={!form.isValid || isFetching} onClick={form.submit} type="submit">
          {form.isValid ? '✅' : '❌'} Submit
        </button>
      </form>
      <CompanyList isFetching={isFetching} assignees={assignees} {...props} />
      <Pagination total={count} perPage={25} onGoPage={onGoPage} />
    </>
  )
}

export default Search
