import * as React from 'react'
import * as _ from 'lodash'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import CompanyList from '../CompanyList/CompanyList'
import { CompanyContext } from '../App'
import Pagination from '../Pagination/Pagination'
import useInput from '../../hooks/useInput/useInput'
import useForm from '../../hooks/useForm/useForm'
import { testValidation, lengthValidation } from '../../utils/validators'
import InputContainer, { SearchInput } from '../Input/Input'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  display: block;
  padding: 1em;
  width: 100%;
  border-radius: 8px;
  border-style: none;
  border: 1px solid #e4e6e8;
  transition: 0.1s ease;
`
type Props = RouteComponentProps<{ company: string }>
interface FormState {
  firstName: string
  lastName: string
  company: string
}
const SearchInputText = styled.input`
  display: block;
  padding: 1em;
  width: 100%;
  border-radius: 8px;
  border-style: none;
  border: 1px solid #e4e6e8;
  transition: 0.1s ease;
  width: 100%;
  background: #ffffff;
  color: #000000;
  font-weight: 500;
  transition: all 0.4s ease-in-out;
  font-size: 14px;
  line-height: 24px;
  text-rendering: auto;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  background-color: white;
  cursor: text;
  margin: 0em;
  font: 400 11px system-ui;
`
function Search(props: Props) {
  const {
    match: { params },
  } = props
  const firstName = useInput('', {
    validations: [lengthValidation, testValidation],
  })
  const lastName = useInput('', {
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
    <Form>
      <InputContainer input={firstName} label="First Name">
        <Input type="text" value={firstName.value} onChange={firstName.onChange} onBlur={firstName.onBlur} />
      </InputContainer>
      <InputContainer input={lastName} label="Last Name">
        <Input type="text" value={lastName.value} onChange={lastName.onChange} onBlur={lastName.onBlur} />
      </InputContainer>
      <SearchInput input={company} label="Company">
        <SearchInputText type="text" value={company.value} onChange={company.onChange} onBlur={company.onBlur} />
      </SearchInput>

      <button disabled={!form.isValid} onClick={form.submit} type="submit">
        {form.isValid ? '✅' : '❌'} Submit
      </button>
    </Form>
  )
}

export default Search
