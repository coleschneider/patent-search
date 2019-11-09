// / <reference types="node" />
// / <reference types="react" />
// / <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.pdf' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// type ShallowProps = import('enzyme').ShallowRendererProps
// type ShallowWrapper = import('enzyme').ShallowWrapper
// // declare const mount: import('enzyme').MountRendererProps
// // declare const mount: import('enzyme').MountRendererProps
// declare namespace NodeJS {
//   function shallow<C extends Component, P = C['props'], S = C['state']>(
//     node: ReactElement<P>,
//     options?: ShallowRendererProps,
//   ): ShallowWrapper<P, S, C>

//   function shallow<P>(node: ReactElement<P>, options?: ShallowProps): ShallowWrapper<P, any>
//   function shallow<P, S>(node: ReactElement<P>, options?: ShallowProps): ShallowWrapper<P, S>

//   interface Global {
//     shallow: shallow
//     mount: import('enzyme').MountRendererProps
//     render: import('enzyme').render
//   }
// }
