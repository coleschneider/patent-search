import React from 'react'

const UPWARDS = 'up'
const DOWNWARDS = 'down'

const UNPINNED = 'unpinned'
const PINNED = 'pinned'
const STATIC = 'static'

type ModeType = 'pinned' | 'unpinned' | 'static'
type DirectionType = 'up' | 'down'

interface Options {
  pinStart: number
}

function getScrollTop(): number {
  if (window.pageYOffset !== undefined) {
    return window.pageYOffset
  }
  if (document.documentElement) {
    return document.documentElement.scrollTop
  }
  if (document.body) {
    return document.body.scrollTop
  }
  throw new Error('Could not determine scrollTop!')
}
function getDirection(lastScrollTop: { current: number }) {
  return lastScrollTop.current < getScrollTop() ? DOWNWARDS : UPWARDS
}
const getScrollHeight = (el: HTMLElement | null) =>
  el ? el.getBoundingClientRect().height : document.body.scrollHeight

const determineMode = (pinStart: number, scrollTop: number, direction: DirectionType): ModeType => {
  if (pinStart >= scrollTop) {
    return STATIC
  }
  return direction === UPWARDS ? PINNED : UNPINNED
}
type EffectFunction = ({ mode }: { mode: ModeType }) => void
function useHeadroom(
  ref: React.MutableRefObject<HTMLElement | null>,
  options: Options,
  effect: EffectFunction,
  wait: number,
) {
  const { pinStart } = options
  const lastKnownScrollTop = React.useRef(getScrollHeight(ref.current))
  const curDirection = getDirection(lastKnownScrollTop)
  const lastKnownMode = React.useRef(determineMode(pinStart, 0, curDirection))
  let throttleTimeout: null | string | number = null

  const cb = () => {
    const currPos = getScrollTop()
    const direction: DirectionType = getDirection(lastKnownScrollTop)
    const currMode = determineMode(pinStart, currPos, direction)

    effect({ mode: currMode })
    lastKnownScrollTop.current = currPos
    lastKnownMode.current = currMode
    throttleTimeout = null
  }

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = getScrollTop()
      if (currentScrollTop === lastKnownScrollTop.current) return
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(cb, wait)
        }
      } else {
        cb()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
}

export default useHeadroom
