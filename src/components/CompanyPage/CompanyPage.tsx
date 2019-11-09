import React from 'react'
import * as _ from 'lodash'
import { RouteComponentProps } from 'react-router'
import { companyPatents } from '../../utils/service'
import Patent from '../Patent/Patent'
import Spinner from '../Spinner/Spinner'
import { CompanyContext } from '../App'

function CompanyPage({ match: { params } }: RouteComponentProps<{ company: string }>) {
  const { state, getChartersByCompany } = CompanyContext()

  const {
    charters: { isFetching, patents },
  } = state
  const { company } = params
  React.useEffect(() => {
    const fetchData = async () => {
      getChartersByCompany(company)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Company - {company}</h1>
      {isFetching && <Spinner />}
      {patents ? patents.map(patent => <Patent key={patent.patent_id} {...patent} />) : null}
    </div>
  )
}

export default CompanyPage
