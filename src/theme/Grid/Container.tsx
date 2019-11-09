import * as React from 'react'
import styled, { css } from 'styled-components'
import config, { DIMENSIONS, ConfigMedia } from './config'
import { Colors } from '../colors'

interface Props extends Partial<ConfigMedia> {
  fluid?: boolean
  debug?: boolean
}
const Container = styled.div<Props>`
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    box-sizing: border-box;
    ${p => css`
      ${DIMENSIONS.map(
        d =>
          config(p).container[d] &&
          config(p).media[d]`
      padding-left: ${config(p).paddingWidth[d]}rem;
      padding-right: ${config(p).paddingWidth[d]}rem;
    `,
      )}
    `}

  ${p =>
    !p.fluid &&
    css`
      ${DIMENSIONS.map(
        d =>
          config(p).container[d] &&
          config(p).media[d]`
      ${typeof config(p).container[d] === 'number' ? `width: ${config(p).container[d]}rem;` : `width: 100%;`}
    `,
      )}
    `}
  ${({ debug }) =>
    debug &&
    css`
      background-color: ${Colors.debug};
      outline: ${Colors.white} solid 1px;
    `}
`
const GridContainer = (props: Props) => <Container {...props} />
GridContainer.displayName = 'Container'
export default GridContainer
