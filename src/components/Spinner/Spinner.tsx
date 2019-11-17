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
  border: 3px solid steelblue;
  border-radius: 50%;
  border-right-color: rgb(230, 236, 240);
  display: inline-block;
  width: 25px;
  height: 25px;
  animation: 0.5s linear infinite ${spin};
`

function Spinner() {
  return (
    // <Container>
    <Circle />
    // </Container>
  )
}
export default Spinner
