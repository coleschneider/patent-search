import * as React from 'react'
import styled, { css } from 'styled-components'
import config, { DIMENSIONS, ConfigMedia } from './config'
import { Colors } from '../colors'

interface Props extends ConfigMedia {
  fluid: boolean
  debug: boolean
}
const Row = styled.div<Props>`
      box-sizing: border-box;
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  
  ${p => css`
    ${DIMENSIONS.map(
      d =>
        config(p).container[d] &&
        config(p).media[d]`
      margin-left: -${config(p).gutterWidth[d] / 2}rem;
      margin-right: -${config(p).gutterWidth[d] / 2}rem;
    `,
    )}
  `}
  ${p =>
    p.reverse &&
    css`
      ${Array.isArray(p.reverse)
        ? DIMENSIONS.map(
            d =>
              config(p).breakpoints[d] &&
              config(p).media[d]`
      flex-direction:${p.reverse.indexOf(d) !== -1 ? `row-reverse` : `row`};`,
          )
        : 'flex-direction: row-reverse;'}
    `}
  ${({ debug }) =>
    debug &&
    css`
      background-color: ${Colors.debug};
      outline: #fff solid 1px;
    `}
`

const GridRow = (props: Partial<Props>) => <Row {...props} />
GridRow.displayName = 'Row'
export default GridRow
