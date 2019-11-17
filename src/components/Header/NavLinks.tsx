import * as React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface NavLinkProps {
  path: ConstantPaths
  display: string
  target?: string
}

const LinkStyles = css`
  z-index: 2;
  margin: 0 30px;
  cursor: pointer;
  line-height: 2.5em;
  text-decoration: none;
  color: #0f3351;
  ::before {
    content: '';
    position: relative;
    display: block;
    width: 100%;
    height: 2px;
    top: 18px;
    z-index: 7;
    left: 0;
    background-color: #0f3351;
    transform: scaleX(0);
    transition: all 0.65s cubic-bezier(0.7, 0.3, 0, 1);
    transform-origin: left;
    will-change: transform;
  }
  &:hover {
    &::after {
      transform: scale(1);
    }
  }
`
const TextLink = styled(({ matches, ...restProps }) => <Link {...restProps} />)`
  ${LinkStyles}
  ::after {
    content: '';
    position: relative;
    display: block;
    width: 100%;
    height: 2px;
    z-index: 8;
    left: 0;
    background-color: #0f3351;
    transform: ${({ matches }) => (matches ? 'scale(1)' : 'scale(0)')};
    transition: all 0.65s cubic-bezier(0.7, 0.3, 0, 1);
    transform-origin: right;
  }
`

const navPaths: NavLinkProps[] = [
  { path: '/', display: 'SEARCH' },
  { path: '/about', display: 'ABOUT' },
  { path: '/help', display: 'HELP' },
]

function NavLink({ display, path, ...rest }: NavLinkProps) {
  const isMatch = useRouteMatch(path)

  return (
    <TextLink {...rest} to={path} matches={isMatch && isMatch.isExact}>
      {display}
    </TextLink>
  )
}
NavLink.displayName = 'NavLink'

function NavLinks() {
  return (
    <React.Fragment>
      {navPaths.map(props => (
        <NavLink key={props.display} {...props} />
      ))}
    </React.Fragment>
  )
}

NavLinks.displayName = 'NavLinks'
export default NavLinks
