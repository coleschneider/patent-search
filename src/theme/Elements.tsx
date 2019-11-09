import React from 'react'
import styled, { css } from 'styled-components'
import { Link, LinkProps } from 'react-router-dom'
import { Colors, primaryGradient, secondaryGradient, withHover } from './colors'
import Icons from './Icons'

const fontColorMixin = ({ primary }: { primary?: boolean }) => `
    color: ${primary ? Colors.darkBlue : Colors.white};
`

export const H1 = styled.h1`
  font-size: 3.8rem;
  ${fontColorMixin}
`
export const H2 = styled.h1`
  font-size: 1.6rem;
  ${fontColorMixin}
`

export const P = styled.p`
  font-size: 1rem;
  ${fontColorMixin}
`

export const PSecondary = styled(P)`
  color: ${Colors.grey};
  box-sizing: border-box;
  letter-spacing: -0.05px;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
`
interface ButtonProps {
  primary?: boolean
}

interface ButtonIconProps extends ButtonProps {
  icon: Icons
}

const buttonStyles = (props: ButtonProps) => css`
  margin-left: 8px;
  vertical-align: middle;
  text-decoration: none;
  border: none;
  cursor: pointer;
  color: white;
  ${props.primary ? primaryGradient : secondaryGradient}
  color: ${props.primary ? Colors.white : '#425A70'};
  height: 32px;
  padding-right: 16px;
  padding-left: 16px;
  letter-spacing: 0;
  line-height: 32px;
  font-size: 12px;
  margin-right: 0;
  flex-wrap: nowrap;
  align-items: center;
  display: inline-flex;
  position: relative;
  margin-bottom: 0;
  padding-bottom: 0;
  padding-top: 0;
  border-radius: 3px;
  font-weight: 500;
  box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.3), inset 0 -1px 1px 0 rgba(67, 90, 111, 0.06);
`
const withIcon = (component: React.FunctionComponent<any>) => styled(component)`
  margin-left: 8px;
  height: 12px;
  width: 12px;
  margin-right: -2px;
`

type ExternalLink = {
  to?: string
  href: string
  target: string
}

type InternalLink = {
  to: string
  href?: never
  target?: never
}

export const Button = styled.button`
  ${buttonStyles}
`
export const BLink = styled(Link)`
  ${buttonStyles}
`
export const ExternalBLink = styled.a`
  ${buttonStyles}
`

type BaseProps = {
  icon: Icons
  children: React.ReactNode
} & ButtonProps

type BProps = BaseProps & (InternalLink | ExternalLink)

export const ButtonIcon: React.FC<BProps> = ({ icon, children, ...rest }) => {
  const IconComponent = withIcon(Icons[icon])
  let LinkComponent
  if (rest.to) {
    LinkComponent = BLink
  } else {
    LinkComponent = ExternalBLink
  }
  return (
    <LinkComponent {...rest}>
      {children}
      <IconComponent />
    </LinkComponent>
  )
}

export const SVGButton = styled(Button)`
  color: #1070ca;
  background-color: transparent;
  background-image: none;
  box-shadow: none;
  outline: none;
  border: none;
  :hover {
    background-color: ${Colors.transparentDarken};
    background-image: none;
  }
`
export const Pane = styled.div`
  background-color: ${Colors.white};
  border-radius: 5px;
  width: 100%;
  ${withHover}
  transition-duration: 150ms;
  transition-property: box-shadow, transform, border;
  transition-timing-function: cubic-bezier(0, 0.2, 1);
`
