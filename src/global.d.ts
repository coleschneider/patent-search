type DimensionCallback = (dimensions: ClientRect | DOMRect) => void
type Icons = 'PointerRight' | 'Close' | 'LeftArrow'

type ConstantPaths = '/mywork' | '/' | '/static/media/Resume.pdf'

type renderFn = typeof import('enzyme').render
type mountFn = typeof import('enzyme').mount
type shallowFn = typeof import('enzyme').shallow

declare const shallow: shallowFn
declare const mount: mountFn
declare const render: renderFn
type c = typeof import('enzyme').render
declare namespace NodeJS {
  interface Global {
    shallow: shallowFn
    mount: mountFn
    render: renderFn
    IS_TEST: boolean
    WEBPACK_BUILD_TYPE: 'development' | 'production'
    GA_ID: 'test-id'
  }
}
