import React from 'react'
import * as _ from 'lodash'
import { RouteComponentProps } from 'react-router'
import { companyPatents } from '../../utils/service'
import Patent from '../Patent/Patent'
import Spinner from '../Spinner/Spinner'
import { CompanyContext } from '../App'
import { LoadMore } from '../CompanyList/CompanyList'

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
      <h1>{isFirstFetch ? `Fetching patent data for ${company}'s profile` : `Company - ${company}`}</h1>
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
