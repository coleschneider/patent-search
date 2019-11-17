import React from 'react'
import styled, { css, StyledComponent } from 'styled-components'
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

const MessageStyles = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: baseline;
`
type MessageTypes = 'Info' | 'Success' | 'Warning' | 'Error'
type Icons = 'fa fa-check' | 'fa fa-info-circle' | 'fa fa-warning' | 'fa fa-times-circle'
type Mess = { [key in MessageTypes]: ({ children }: { children: React.ReactNode }) => JSX.Element }

const MessageType = {
  Info: {
    component: styled(MessageStyles)`
      color: #059;
      background-color: #bef;
    `,
    icon: 'fa fa-info-circle',
  },
  Warning: {
    component: styled(MessageStyles)`
      color: #9f6000;
      background-color: #feefb3;
    `,
    icon: 'fa fa-warning',
  },
  Success: {
    component: styled(MessageStyles)`
      color: #270;
      background-color: #dff2bf;
    `,
    icon: 'fa fa-check',
  },
  Error: {
    component: styled(MessageStyles)`
      color: #d8000c;
      background-color: #ffbaba;
    `,
    icon: 'fa fa-times-circle',
  },
}
const MessageDetails = styled.div`
  display: flex;
  margin-left: 1rem;
`
export const Bold = styled.span`
  font-weight: 800;
  display: contents;
`
export const Messages = (Object.keys(MessageType) as MessageTypes[]).reduce(
  (acc, curr) => {
    acc[curr] = ({ children }: { children: React.ReactNode; iconOverride: React.ReactNode }) => {
      const { icon, component: Component } = MessageType[curr]

      return (
        <Component>
          <i className={icon} />
          <MessageDetails>{children}</MessageDetails>
        </Component>
      )
    }
    return acc
  },

  {} as Mess,
)
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
