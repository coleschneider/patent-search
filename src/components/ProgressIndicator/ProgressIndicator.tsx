import React from 'react'
import { animated, AnimatedValue } from 'react-spring'

import styled from 'styled-components'

type OverwriteKeys<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] }

const Progress_Title = styled.span`
  font-weight: bold;
  font-size: 16px;
`
const Progress_Description = styled.span`
  font-size: 14px;
  margin-top: 4px;
`
const Progress_Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  margin-right: 48px;
`
const Progress_Wrapper = styled(animated.div)`
  display: flex;
  background-color: #2196f3;
  align-items: center;
  border-radius: 48px;
  padding: 4px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  color: white;
  position: fixed;
  bottom: 10px;
  right: 5px;
`
interface ChartProps {
  progress: number
  innerCircleColor: string
  outterCircleColor: string
}

const PieChartProgress = ({
  progress,
  outterCircleColor = 'white',
  innerCircleColor = 'rgba(33,150,243, 0.6)',
}: ChartProps) => {
  return (
    <animated.svg height="60" width="60" viewBox="0 0 24 24">
      <circle r="12" cx="12" cy="12" fill={outterCircleColor} />
      <circle
        r="5"
        cx="12"
        cy="12"
        fill="transparent"
        stroke={innerCircleColor}
        strokeWidth="10"
        strokeDasharray={`calc(${progress || 0} * 31.42 / 100) 31.42`}
        transform="rotate(-90) translate(-24)"
        style={{ transition: 'all 0.25s ease-in' }}
      />
    </animated.svg>
  )
}
interface IndicatorProps extends ChartProps {
  title: string
  description: string
  spring: AnimatedValue<
    Pick<
      OverwriteKeys<
        {
          x: number
          config: {
            delay: number
          }
        },
        React.CSSProperties
      >,
      'x'
    >
  >
}
const ProgressIndicator = ({ spring, title, description, ...rest }: IndicatorProps) => (
  <Progress_Wrapper
    style={{
      transform: spring.x.interpolate(y => {
        return `translateX(${y}px)`
      }),
    }}
  >
    <Progress_Container>
      <Progress_Title>{title}</Progress_Title>
      <Progress_Description>{description}</Progress_Description>
    </Progress_Container>
    <PieChartProgress {...rest} />
  </Progress_Wrapper>
)

export default ProgressIndicator
