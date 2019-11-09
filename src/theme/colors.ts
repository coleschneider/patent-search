import { css } from 'styled-components'

export enum Colors {
  darkBlue = '#0f3351',
  debug = '#5901ad40',
  white = '#ffffff',
  blue = '#0788de',
  blueDarker = '#116ab8',
  whiteHover = '#fafbfb',
  offwhiteHover = '#eaecee',
  offwhite = '#f4f5f7',
  grey = 'rgb(102, 120, 138)',
  transparentDarken = 'rgba(67, 90, 111, 0.06)',
  evergreen = 'rgb(35, 67, 97)',
}
interface ShadowProps {
  hover: boolean
  level: 1 | 2 | 3
}

const boxShadows = [
  '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
]
export const withHover = ({ hover, level }: ShadowProps) => {
  return css`
    box-shadow: ${boxShadows[level]};
    :hover {
      ${hover &&
        css`
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        `}
    }
  `
}
export const secondaryGradient = css`
  background-image: linear-gradient(to bottom, ${Colors.white}, ${Colors.offwhite});
  :hover {
    background-image: linear-gradient(to bottom, ${Colors.whiteHover}, ${Colors.offwhiteHover});
  }
`
export const primaryGradient = css`
  background-image: linear-gradient(to bottom, ${Colors.blue}, ${Colors.blueDarker});
  :hover {
    background-image: linear-gradient(to bottom, #0679c5, #0f5da1);
  }
`
