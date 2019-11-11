import { animated, useSpring } from 'react-spring'
import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { RouteProps, useHistory } from 'react-router-dom'
import { ReactComponent as LeftArrow } from './LeftArrow.svg'
import { media } from '../../theme/Grid/config'
import useHeadroom from '../../hooks/useHeadroom/useHeadRoom'
import NavLinks from './NavLinks'
// @keyframes nav {
//   from { opacity: 0; transform: translate3d(0, -25px, 0) }
//   to { opacity: 1; transform: translate3d(0, 0, 0) }
// }
const nav = keyframes`
  from { opacity: 0; transform: translate3d(0, -25px, 0) }
  to { opacity: 1; transform: translate3d(0, 0, 0) }
`
const ArrowIcon = styled(LeftArrow)`
  display: inline-block;
  fill: currentcolor;
  height: 30px;
  width: 30px;
  user-select: none;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
`

const HeadroomWrapper = styled.div`
  animation: ${nav} 0.2s ease-in-out forwards;
  height: 67px;
  position: fixed;
  z-index: 20;
  width: 100%;
  top: 0;
  display: block;
`
interface StyleProps {
  pinned: boolean
}
const HeaderPinned = styled(animated.div)`
  z-index: 15;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 8vh;
`

const Navbar = styled.div`
  color: #0f3351;
  z-index: 16;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const NavBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px hsla(0, 0%, 50%, 0.12);
  z-index: -1;
`
const NavOuter = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
`

const NameContainer = styled.div`
  margin: 0 auto;
  display: block;

  max-width: 100%;
  width: 100%;
  ${media.xs`
  max-width: 1280px;
  width: 90%;  
  `}
`
const Name = styled.div`
  z-index: 2;
  line-height: 16.5px;
  position: relative;
  color: #0f3351;
  text-decoration: none;
  display: none;
  ${media.sm`
    display: block;
  `}
`

const Back = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const BackText = styled.div`
  display: none;
  ${media.sm`
    display: block;
    `}
`
interface Props extends RouteProps {
  isPatentPage: boolean
}

function Header(props: Props) {
  const headRef = React.useRef<HTMLDivElement>(null)
  const [modeType, setMode] = React.useState('static')
  const { goBack } = useHistory()

  useHeadroom(
    headRef,
    { pinStart: 100 },
    ({ mode }) => {
      if (mode !== modeType) setMode(mode)
    },
    300,
  )
  const { y } = useSpring({
    y: modeType === 'unpinned' ? -100 : 0,
  })
  const handleGoBack = () => {
    goBack()
  }
  return React.useMemo(
    () => (
      <div data-testid="header-testId">
        <div>
          <HeadroomWrapper ref={headRef}>
            <HeaderPinned
              style={{
                transform: y.interpolate(int => `translateY(${int}px)`),
              }}
            >
              <Navbar>
                <NavBackground />
                <NavOuter>
                  <NameContainer>
                    {props.isPatentPage ? (
                      <Back onClick={handleGoBack}>
                        <ArrowIcon />
                        <BackText>Back to search results</BackText>
                      </Back>
                    ) : (
                      <Name>Patent Aggregator</Name>
                    )}
                  </NameContainer>
                </NavOuter>
                <NavLinks />
              </Navbar>
            </HeaderPinned>
          </HeadroomWrapper>
        </div>
      </div>
    ),
    [handleGoBack, props.isPatentPage, y],
  )
}

export default Header
