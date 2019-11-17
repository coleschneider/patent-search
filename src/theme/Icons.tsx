import * as React from 'react'

// import { ReactComponent as PointerRight } from '../assets/icons/PointerRight.svg'
// import { ReactComponent as Close } from '../assets/icons/Close.svg'
// import { ReactComponent as LeftArrow } from '../assets/icons/LeftArrow.svg'

type IconComponents = { [key in Icons]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> }

const Icons: IconComponents = {
  // PointerRight,
  // Close,
  // LeftArrow,
}

export default Icons
