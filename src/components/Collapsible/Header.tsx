import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import usePrevious from '../../hooks/usePrevious/usePrevious'
import IconClose from './CloseIcon'

const Title = styled.h4`
  font-size: 0.8rem;
  line-height: 1.4;
`

const Item = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: block;
  font-weight: 700;
  padding: 1rem;
  width: 100%;
  &,
  &:hover {
    color: #333;
    text-decoration: none;
  }
  &:focus {
    outline: 0;
  }
`

const Container = styled.div`
  background-color: #fff;
  border-color: #ddd;
`

const Wrapper = styled.span`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const Icon = styled(animated.span)``

const Header = ({ title, icon, onClick, id, isOpen }) => {
  const previous = usePrevious(isOpen)

  const { transform } = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' },
  })

  const handleClick = event => {
    onClick(id)
  }

  return (
    <Container>
      <Item onClick={handleClick}>
        <Wrapper>
          <Title>{title}</Title>
          <Icon
            // isOpen={isOpen}
            style={{
              transform: isOpen && previous === isOpen ? 'rotate(180deg)' : transform,
            }}
          >
            <IconClose />
          </Icon>
        </Wrapper>
      </Item>
    </Container>
  )
}

export default Header
