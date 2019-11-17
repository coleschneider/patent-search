import * as React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import Header from '../Collapsible/Header'
import Collapse from '../Collapsible/Collapse'
import { Bold } from '../../theme/Elements'

const Wrapper = styled.div`
  display: flex;
  border-bottom-color: rgb(230, 236, 240);
  border-bottom-width: 1px;
  pointer-events: auto;
  flex-direction: column;
`
const Container = styled.div`
  transition-property: background;
  cursor: pointer;
  padding: 1rem;
  transition-duration: 0.2s;
  :hover {
    background-color: rgb(245, 248, 250);
  }
`

const ContainerAccordion = styled.div`
  background-color: #fff;
  border-color: #ddd;
  border-style: solid;
  border-width: 0 0 1px;
  &:last-child {
    border: 0;
  }
`
export const Content = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 1rem;
  background-color: rgb(245, 248, 250);
`
export const TextWrapper = styled.div`
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  min-width: 0px;
  min-height: 0px;
  position: relative;
  z-index: 0;
  pointer-events: auto;
  margin-top: -1px;
  border-width: 0px;
  border-style: solid;
  border-color: black;
  border-image: initial;
`
export const NameWrapper = styled.div`
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  flex-basis: auto;
  flex-shrink: 0;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  min-width: 0px;
  min-height: 0px;
  position: relative;
  z-index: 0;
  pointer-events: auto;
  margin-bottom: 2px;
  justify-content: space-between;
  flex-direction: row;
  border-width: 0px;
  border-style: solid;
  border-color: black;
  border-image: initial;
`
const ActionWrapper = styled.div`
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  flex-basis: auto;
  flex-shrink: 0;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  min-width: 0px;
  min-height: 0px;
  position: relative;
  z-index: 0;
  pointer-events: auto;
  max-width: 425px;
  margin-top: 9px;
  justify-content: space-between;
  flex-direction: row;
  border-width: 0px;
  border-style: solid;
  border-color: black;
  border-image: initial;
`
export const DetailsContainer = styled.div`
  font-weight: 400;
  color: rgb(20, 23, 26);
  font-size: 14px;
  overflow-wrap: break-word;
  line-height: 1.3125;
  min-width: 0px;
  position: relative;
`

interface Prop extends RouteComponentProps<{ company: string }>, Company {}

function Company({
  assignee_lastknown_country,
  assignee_last_seen_date,
  assignee_lastknown_city,
  assignee_first_seen_date,
  assignee_id,
  assignee_total_num_patents,
  assignee_organization,
  assignee_first_name,
  assignee_last_name,
  match,
  index,
}: Prop) {
  const company = assignee_organization || match.params.company
  const [isActiveItem, setActiveItem] = React.useState({})
  const [isActiveIndex, setActiveIndex] = React.useState(null)
  const allowMultiple = true
  const toggleItem = index => {
    if (allowMultiple) {
      setActiveItem(prevState => ({
        // https://goo.gl/otnvXd
        // Allow Multiple collapsible logic: credit to Shubham Khatri https://goo.gl/XVqFNL
        ...prevState,
        [index]: !prevState[index],
      }))
    }
    return setActiveIndex(isActiveIndex === index ? null : index)
  }
  let checkOpen
  if (allowMultiple) {
    checkOpen = isActiveItem[index]
  } else {
    checkOpen = isActiveIndex === index
  }

  return (
    <ContainerAccordion>
      <Header
        title={assignee_organization || `${assignee_first_name} ${assignee_last_name}`}
        icon="down-chevron"
        id={index}
        onClick={toggleItem}
        isOpen={checkOpen}
        allowMultiple={allowMultiple}
      />

      <Collapse isOpen={checkOpen}>
        <Content>
          <TextWrapper>
            <NameWrapper>
              Company Name: <Bold>{assignee_organization}</Bold>
            </NameWrapper>
            <DetailsContainer>{`Location: ${assignee_lastknown_city}, ${assignee_lastknown_country}`}</DetailsContainer>
            <DetailsContainer>{`First filing: ${assignee_first_seen_date}`}</DetailsContainer>
            <DetailsContainer>{`Last filing: ${assignee_last_seen_date}`}</DetailsContainer>
            <DetailsContainer>{`Filings count: ${assignee_total_num_patents}`}</DetailsContainer>
          </TextWrapper>
          <ActionWrapper>
            <Link to={`/patents/${assignee_id}`}>See More</Link>
          </ActionWrapper>
        </Content>
      </Collapse>
    </ContainerAccordion>
  )
}

export default Company
