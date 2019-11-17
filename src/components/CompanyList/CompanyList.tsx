import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import Spinner from '../Spinner/Spinner'
import Company from '../Company/Company'
import { CompanyContext } from '../App'
import { Messages } from '../../theme/Elements'

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
function CompanyList(props: RouteComponentProps<{ company: string }>) {
  const {
    match: { params },
  } = props
  const { company } = params
  const { getCompaniesByNameIfNeeded, getCompaniesByName, profileByCompany } = CompanyContext()

  React.useEffect(() => {
    getCompaniesByNameIfNeeded(company, 1)
  }, [company])

  const { companies, error, count, total, isFetching, page } = profileByCompany(company)

  const totalPages = Math.ceil(total / 25)

  const handleClick = () => {
    getCompaniesByName(company, page + 1)
  }

  if (isFetching && companies.length === 0) {
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
      {total && <Messages.Info>Found: {total}</Messages.Info>}
      {companies.map((data: Company, i: number) => (
        <Company {...data} key={i} {...data} {...props} />
      ))}
      {isFetching && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      {error && <Messages.Error>{error}</Messages.Error>}
      <LoadMore onClick={handleClick} disabled={page === totalPages}>
        Load More
      </LoadMore>
    </>
  )
}

export default CompanyList
