import React from 'react'
import styled, { keyframes } from 'styled-components'

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
  return <Circle />
}
export default Spinner
