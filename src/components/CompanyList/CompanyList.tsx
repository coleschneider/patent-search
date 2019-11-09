import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import Spinner from '../Spinner/Spinner'
import Company from '../Company/Company'

interface Props extends RouteComponentProps<{ company: string }> {
  isFetching: boolean
  assignees: AssigneedDetails[] | null
}
function CompanyList({ isFetching, assignees, ...rest }: Props) {
  if (isFetching) {
    return <Spinner />
  }
  if (!assignees) {
    return <div>Nothing to Display</div>
  }

  return (
    <>
      {assignees.map((data, i) => (
        <Company {...data} key={data.assignee_id} {...rest} />
      ))}
    </>
  )
}

export default CompanyList
