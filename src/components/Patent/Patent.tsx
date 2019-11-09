import React from 'react'
import styled from 'styled-components'

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

function Patent({ patent_title }: Patent) {
  return (
    <Wrapper>
      <Container>
        <p>{patent_title}</p>
      </Container>
    </Wrapper>
  )
}

export default Patent
