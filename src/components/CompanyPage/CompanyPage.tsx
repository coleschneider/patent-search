import React from 'react'
import * as _ from 'lodash'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import { companyPatents } from '../../utils/service'
import Patent from '../Patent/Patent'
import Spinner from '../Spinner/Spinner'
import { CompanyContext } from '../App'
import { LoadMore } from '../CompanyList/CompanyList'
import download from '../../utils/download'

const CompanyTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.2rem;
  font-size: 1.2rem;
  border-bottom: 1px solid rgb(230, 236, 240);
`
function CompanyPage(props: RouteComponentProps<{ company: string }>) {
  const { state, getPatentsByCompany, patentsByCompany, getPatentById } = CompanyContext()
  const companyUrl = props.match.url.substring(1)
  const { company } = props.match.params
  React.useEffect(() => {
    window.scroll(0, 0)
    const fetchData = async () => {
      getPatentsByCompany(companyUrl, props.match.params.company, 1)
    }
    fetchData()
  }, [])
  const companyPatents = patentsByCompany(companyUrl)
  const patents = companyPatents.ids.map(id => getPatentById(id))
  const onLoadMore = () => {
    getPatentsByCompany(companyUrl, props.match.params.company, companyPatents.page + 1)
  }
  const totalPages = companyPatents && Math.ceil(companyPatents.total / 25)
  const isFirstFetch = !companyPatents || (companyPatents.isFetching && companyPatents.ids.length === 0)

  return (
    <div>
      <CompanyTitleContainer>
        <h3>{isFirstFetch ? `Fetching patent data for ${company}'s profile` : `Company - ${company}`}</h3>
        <i
          style={{ cursor: 'pointer' }}
          className="fa fa-file-excel-o"
          aria-hidden="true"
          onClick={() => download('test', company)}
        />
      </CompanyTitleContainer>
      {patents ? patents.map(patent => <Patent key={patent.patent_id} {...patent} />) : null}
      {companyPatents.isFetching && <Spinner />}
      {!isFirstFetch && (
        <LoadMore onClick={onLoadMore} disabled={!companyPatents || companyPatents.page === totalPages}>
          Load More
        </LoadMore>
      )}
    </div>
  )
}

export default CompanyPage
