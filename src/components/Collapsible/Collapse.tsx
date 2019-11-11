import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import usePrevious from '../../hooks/usePrevious/usePrevious'
import useMeasure from '../../hooks/useMeasure/useMeasure'

const Content = styled(animated.div)`
  font-size: 14px;
  overflow: hidden;
  text-align: left;
  will-change: height;
`

const Body = styled(animated.div)`
  overflow: hidden;
  position: relative;
`
interface Props {
  children: React.ReactNode | React.ReactNode[]
  isOpen: boolean
}
const Collapse = ({ children, isOpen }: Props) => {
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()

  const { height } = useSpring({
    from: { height: 0 },
    to: { height: isOpen ? viewHeight : 0 },
  })

  return (
    <Content
      style={{
        height: isOpen && previous === isOpen ? 'auto' : height,
      }}
    >
      <Body {...bind}>{children}</Body>
    </Content>
  )
}

export default Collapse
