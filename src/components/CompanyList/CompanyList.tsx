import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import Spinner from '../Spinner/Spinner'
import Company from '../Company/Company'
import { CompanyContext } from '../App'
import useSocket from '../../hooks/useSocket/useSocket'
import { Messages } from '../../theme/Elements'

interface Props extends RouteComponentProps<{ company: string }> {
  isFetching: boolean
  assignees: AssigneedDetails[] | null
}
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`
export const LoadMore = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  border: none;
  background: rgb(245, 248, 250);
  font: inherit;
`
export const MessageText = styled.div`
  margin-right: 1rem;
`
function CompanyList(props: Props) {
  const {
    match: { params },
  } = props
  const { company } = params
  const { getCompaniesByNameIfNeeded, getCompaniesByName, profileByCompany, getCompaniesById } = CompanyContext()

  React.useEffect(() => {
    getCompaniesByNameIfNeeded(company, 1)
  }, [company])

  const companyProfile = profileByCompany(company)
  const companies = companyProfile.ids.map(id => getCompaniesById(id))
  const totalPages = companyProfile && Math.ceil(companyProfile.total / 25)

  const handleClick = () => {
    getCompaniesByName(company, companyProfile.page + 1)
  }

  if (!companyProfile || (companyProfile.isFetching && companyProfile.ids.length === 0)) {
    return (
      <Messages.Info>
        <MessageText>
          Loading {company}
          's profile...
        </MessageText>
        <Spinner />
      </Messages.Info>
    )
  }

  return (
    <>
      {companyProfile.total && <Messages.Info>Found: {companyProfile.total}</Messages.Info>}
      {companies.map((data, i) => (
        <Company index={i} {...data} key={i} {...companyProfile} {...props} />
      ))}

      {companyProfile.isFetching && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      {companyProfile.error && <Messages.Error>{companyProfile.error}</Messages.Error>}

      <LoadMore onClick={handleClick} disabled={!companyProfile || companyProfile.page === totalPages}>
        Load More
      </LoadMore>
    </>
  )
}

export default CompanyList
