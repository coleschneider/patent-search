import React from 'react'
import styled from 'styled-components'

interface InputContainerProps {
  children: any
  label?: string
  input: ReturnType<typeof useInput>
}
const InputContainerWrapper = styled.div`
  margin-left: 1em;
  margin-right: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
`
const Label = styled.label``
function InputContainer({ children, label, input }: InputContainerProps) {
  return (
    <InputContainerWrapper>
      {label && <Label htmlFor="">{label}</Label>}
      {children}

      {input.touched && input.errors && input.errors.length > 0 && (
        <div>
          Error:{' '}
          {input.errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </div>
      )}
    </InputContainerWrapper>
  )
}

const Box = styled.div`
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  width: 100%;
`

const SearchSVG = styled.svg`
  height: 20px;
  width: 20px;
  min-width: 20px;
  min-height: 20px;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 1rem;
  cursor: pointer;
  overflow: hidden;
`
export default InputContainer
export function SearchInput({ children }) {
  return (
    <InputContainerWrapper>
      <Box>
        <SearchSVG viewBox="0 0 24 24" pos="absolute">
          <path
            fill="#000000"
            fillRule="evenodd"
            d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M16.6063847,15.1921711 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3165825,20.0976311 18.6834175,20.0976311 18.2928932,19.7071068 L15.1921711,16.6063847 C14.0235906,17.4815965 12.5723351,18 11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,12.5723351 17.4815965,14.0235906 16.6063847,15.1921711 Z"
          />
        </SearchSVG>
        {children}
      </Box>
    </InputContainerWrapper>
  )
}
