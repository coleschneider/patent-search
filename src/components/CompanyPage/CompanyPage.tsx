import React from 'react'
import * as _ from 'lodash'
import { RouteComponentProps, Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useSpring } from 'react-spring'
import Patent from '../Patent/Patent'
import Spinner from '../Spinner/Spinner'
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator'
import { CompanyContext } from '../App'
import { LoadMore, MessageText } from '../CompanyList/CompanyList'
import download from '../../utils/download'
import { Messages, Bold } from '../../theme/Elements'
import { Content, TextWrapper, NameWrapper, DetailsContainer } from '../Company/Company'
import { baseURL } from '../../utils/service'

const CompanyTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.2rem;
  font-size: 1.2rem;
  border-bottom: 1px solid rgb(230, 236, 240);
`

const Download = props => {
  const eventSource = React.useRef(null)
  const [message, setMessage] = React.useState(null)
  const [progress, setProgress] = React.useState(0)

  const [spring, set, stop] = useSpring(() => ({ x: 500, config: { delay: 300 } }))

  React.useEffect(() => {
    const logger = e => {
      const { message: m, step } = JSON.parse(e.data)
      if (step === 4) {
        setMessage(m)
        setProgress(step * 25)
        set({ x: 500, delay: 1000 })
        // eventSource.current.close()
      } else {
        set({ x: 0, delay: 300 })
        setMessage(m)
        setProgress(step * 25)
      }
    }
    const donwloadHandler = e => {
      const { buff } = JSON.parse(e.data)
      download(buff)
    }
    eventSource.current = new EventSource(`${baseURL}/patents/${props.company}/events`)

    eventSource.current.addEventListener('UPDATE', logger)
    eventSource.current.addEventListener('DATA', donwloadHandler)

    return () => {
      eventSource.current.removeEventListener('UPDATE', logger)
      eventSource.current.removeEventListener('DATA', donwloadHandler)
    }
  }, [])

  return (
    <ProgressIndicator
      spring={spring}
      title={message}
      progress={progress}
      description={`Step ${progress / 25} out of 4`}
    />
  )
}
function CompanyPage(props: RouteComponentProps<{ company: string }>) {
  const {
    fetchCompanyIfNeeded,
    getPatentsByCompany,
    patentsByCompany,
    getPatentById,
    getCompaniesById,
    profileByCompany,
  } = CompanyContext()

  const {
    match: {
      params: { company },
    },
  } = props
  const { path, url } = useRouteMatch()
  const companyUrl = url.substring(1)
  React.useEffect(() => {
    window.scroll(0, 0)
    const fetchData = async () => {
      await fetchCompanyIfNeeded(company)
      await getPatentsByCompany(companyUrl, props.match.params.company, 1)
    }
    fetchData()
  }, [])
  const companyPatents = patentsByCompany(companyUrl)
  const companyState = profileByCompany(company)
  const companyProfile = getCompaniesById(company)
  const patents = companyPatents.ids.map(id => getPatentById(id))
  const onLoadMore = () => {
    getPatentsByCompany(companyUrl, props.match.params.company, companyPatents.page + 1)
  }
  const totalPages = companyPatents && Math.ceil(companyPatents.total / 25)

  const loadingPatents = !companyPatents || (companyPatents.isFetching && companyPatents.ids.length === 0)
  const loadingProfile = !companyProfile || (companyState.isFetching && companyState.ids.length === 0)

  if (loadingPatents || loadingProfile) {
    const message = loadingProfile ? 'Fetching Company Profile' : 'Fetching Patents'
    return (
      <Messages.Info>
        <MessageText>{message}</MessageText>
        <Spinner />
      </Messages.Info>
    )
  }

  return (
    <div>
      <Route path={`${path}/download`} exact>
        <Download company={company} />
      </Route>
      <CompanyTitleContainer>
        <Content>
          <TextWrapper>
            <NameWrapper>
              Company Name: <Bold>{companyProfile.assignee_organization}</Bold>
            </NameWrapper>
            <DetailsContainer>{`Filings count: ${companyPatents.total}`}</DetailsContainer>
          </TextWrapper>
          <DetailsContainer>
            <i
              style={{ cursor: 'pointer' }}
              className="fa fa-file-excel-o"
              aria-hidden="true"
              onClick={() => props.history.push(`${url}/download`)}
            />
          </DetailsContainer>
        </Content>
      </CompanyTitleContainer>
      {companyPatents.total && <Messages.Info>Found: {companyPatents.total}</Messages.Info>}
      {patents ? patents.map(patent => <Patent key={patent.patent_id} {...patent} />) : null}

      {companyPatents.error && <Messages.Error>{companyPatents.error}</Messages.Error>}
      {companyPatents.isFetching && <Spinner />}
      {!companyPatents.isFetching && (
        <LoadMore onClick={onLoadMore} disabled={!companyPatents || companyPatents.page === totalPages}>
          Load More
        </LoadMore>
      )}
    </div>
  )
}

export default CompanyPage
