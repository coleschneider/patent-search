import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import Spinner from '../Spinner/Spinner'
import Company from '../Company/Company'
import { CompanyContext } from '../App'

interface Props extends RouteComponentProps<{ company: string }> {
  isFetching: boolean
  assignees: AssigneedDetails[] | null
}
export const LoadMore = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  border: none;
  background: rgb(245, 248, 250);
  font: inherit;
`
function CompanyList(props: Props) {
  const {
    match: { params },
  } = props
  const { company } = params
  const { getCompaniesByName, state, profileByCompany, getCompaniesById } = CompanyContext()
  React.useEffect(() => {
    getCompaniesByName(company, 1)
  }, [company])

  const companyProfile = profileByCompany(company)
  const companies = companyProfile.ids.map(id => getCompaniesById(id))
  const totalPages = companyProfile && Math.ceil(companyProfile.total / 25)

  const handleClick = () => {
    getCompaniesByName(company, companyProfile.page + 1)
  }
  // if (companyProfile && companyProfile.ids.length === 0) {
  //   return <div>None to display</div>
  // }
  if (!companyProfile || (companyProfile.isFetching && companyProfile.ids.length === 0)) {
    return (
      <div>
        <Spinner />
        <i>
          Loading {company}
          's profile...
        </i>
      </div>
    )
  }

  return (
    <>
      {companies.map((data, i) => (
        <Company index={i} {...data} key={i} {...companyProfile} {...props} />
      ))}
      {companyProfile.isFetching && <Spinner />}
      <LoadMore onClick={handleClick} disabled={!companyProfile || companyProfile.page === totalPages}>
        Load More
      </LoadMore>
    </>
  )
}

export default CompanyList
