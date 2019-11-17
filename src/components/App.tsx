import { Route, useRouteMatch } from 'react-router-dom'
import * as React from 'react'
import styled from 'styled-components'
import { media } from '../theme/Grid/config'
import CompanyList from './CompanyList/CompanyList'
import CompanyPage from './CompanyPage/CompanyPage'
import Header from './Header/Header'
import Search from './Search/Search'
import useCompanies from '../hooks/useCompanies/useCompanies'
import useGlobalState from '../hooks/useGlobalState/useGlobalState'

const Main = styled.main`
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  flex-direction: column;
  flex-basis: 0%;
  position: relative;
  flex-shrink: 1;
  flex-grow: 1;
  border-width: 0px;
  border-style: solid;
  border-color: black;
  border-image: initial;
  margin-top: 100px;
  padding: 0px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  flex-direction: column;
  flex-basis: 0%;
  flex-shrink: 0;
  position: relative;
  background-color: rgb(230, 236, 240);
  backface-visibility: hidden;
  flex-grow: 1;
  border-width: 0px;
  border-style: solid;
  border-color: black;
  border-image: initial;
  margin: 0px;
  padding: 0px;
`
const Container = styled.div`
  ${media.md`
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  `}
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: row;
  flex-shrink: 0;
  position: relative;
  z-index: 0;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0);
  flex-grow: 1;
  border-width: 0px;
  border-style: solid;
  border-color: black;
  border-image: initial;
  margin: 10px 0px 0px;
  padding: 0px 10px;
`

const SecondaryColumn = styled.div`
  align-items: stretch;
  box-sizing: border-box;
  flex-direction: column;
  flex-basis: 0%;
  flex-shrink: 0;
  position: relative;
  backface-visibility: hidden;
  display: none;
  width: 360px;
  border-width: 0px;
  border-style: solid;
  border-color: black;
  border-image: initial;
  margin: 0px 20px;
  padding: 0px;
  ${media.md`
    display: block;
  `}
`

const PrimaryColumn = styled.div`
  z-index: 1;
  width: 100%;
  background-color: rgb(255, 255, 255);
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  min-height: 100vh;
`
export const CompanyContext = useGlobalState(useCompanies)

export default function App() {
  const isPatentPage = useRouteMatch({
    path: '/patents/:company',
    exact: true,
  })

  return (
    <CompanyContext.Provider>
      <Header isPatentPage={isPatentPage ? isPatentPage.isExact : false} />
      <Main>
        <Wrapper>
          <Container>
            <PrimaryColumn>
              <Route exact path="/:company?" component={Search} />
              <Route exact path="/:company" component={CompanyList} />
              <Route path="/patents/:company" component={CompanyPage} />
            </PrimaryColumn>
            <SecondaryColumn>
              <h3>Put something here to show on desktop vi</h3>
            </SecondaryColumn>
          </Container>
        </Wrapper>
      </Main>
    </CompanyContext.Provider>
  )
}
