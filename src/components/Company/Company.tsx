import * as React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'

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

interface Prop extends RouteComponentProps<{ company: string }>, AssigneedDetails {}

function Company({ assignee_organization, history }: Prop) {
  const handleGoCompany = () => {
    history.push(`/${assignee_organization}`)
  }
  return (
    <Wrapper onClick={handleGoCompany}>
      <Container>{assignee_organization}</Container>
    </Wrapper>
  )
}

export default Company
