import React from 'react'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: sans-serif;
`

const spin = keyframes`
to {
  transform: rotate(360deg);
}
`

const Circle = styled.div`
  border: 3px solid orangered;
  border-radius: 50%;
  border-right-color: transparent;
  display: inline-block;
  width: 50px;
  height: 50px;
  animation: 1s linear infinite ${spin};
`

function Spinner() {
  return (
    <Container>
      <Circle />
    </Container>
  )
}
export default Spinner
