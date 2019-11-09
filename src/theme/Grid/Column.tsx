import styled, { css, ThemedStyledProps, DefaultTheme } from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../colors'
import config, { sizeProps, DIMENSIONS, ConfigMedia, ConfigDimensions } from './config'

interface ColumnProps extends ConfigDimensions<number>, ConfigMedia {
  debug: boolean
  center: boolean
  offset: {
    [key: string]: number
  }
}
type Props = ThemedStyledProps<ColumnProps, DefaultTheme>
const debugMixin = ({ debug }: Props) =>
  debug &&
  css`
    background-color: ${Colors.debug};
    outline: #fff solid 1px;
  `
const reverseMixin = (p: Props) =>
  p.reverse &&
  css`
    ${Array.isArray(p.reverse)
      ? DIMENSIONS.map(
          d =>
            config(p).breakpoints[d] &&
            config(p).media[d]`
  flex-direction:${p.reverse.indexOf(d) !== -1 ? `column-reverse` : `column`};`,
        )
      : 'flex-direction: column-reverse;'}
  `
const paddingMixin = (p: Props) =>
  !p.noGutter &&
  css`
    ${DIMENSIONS.map(
      d =>
        config(p).breakpoints[d] &&
        config(p).media[d]`
  padding-right: ${config(p).gutterWidth[d] / 2}rem;
  padding-left: ${config(p).gutterWidth[d] / 2}rem;
`,
    )}
  `
const bpMixin = (p: Props) =>
  css`
    ${DIMENSIONS.map(
      d =>
        config(p).breakpoints[d] &&
        config(p).media[d]`
  ${p[d] &&
    `
    flex: 1 1 ${(p[d] / config(p).columns[d]) * 100}%;
    max-width: ${(p[d] / config(p).columns[d]) * 100}%;
  `}
`,
    )}
  `
const offsetMixin = (p: Props) =>
  p.offset &&
  css`
    ${DIMENSIONS.map(
      d =>
        config(p).breakpoints[d] &&
        config(p).media[d]`
${
  typeof p.offset === 'object'
    ? p.offset[d] !== undefined && `margin-left: ${p.offset[d] > 0 ? (p.offset[d] / config(p).columns[d]) * 100 : 0}%`
    : `margin-left: ${(p.offset / config(p).columns.xs) * 100}%`
};
`,
    )}
  `
const centerMixin = (p: Props) =>
  p.center &&
  css`
    align-items: center;
  `

const Column = styled.div<Props>`
box-sizing: border-box;
  flex: 1 0 auto;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  ${centerMixin}
  ${paddingMixin}
  ${bpMixin}
  ${offsetMixin}
  ${reverseMixin}
  ${debugMixin}
`

Column.propTypes = {
  debug: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node,
  ...sizeProps(),
}
Column.displayName = 'Column'

export default Column
