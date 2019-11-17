import React from 'react'
import { animated } from 'react-spring'


const PieChartProgress = ({
spring,
progress,
outterCircleColor = 'white',
innerCircleColor = 'rgba(33,150,243, 0.6)',
}) => {
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
const ProgressIndicator = ({ spring, active, title, description, progress, className }) => (
<animated.div
  style={{
    transform: spring.x.interpolate(y => {
      return `translateX(${y}px)`
    }),
  }}
  className="batch-upload-progress__container"
>
  <React.Fragment>
    <div className="batch-upload-progress__title-container">
      <span className="batch-upload-progress__title">{title}</span>
      <span className="batch-upload-progress__description">{description}</span>
    </div>
    <PieChartProgress spring={spring} progress={progress} />
  </React.Fragment>
</animated.div>
)

export default ProgressIndicator