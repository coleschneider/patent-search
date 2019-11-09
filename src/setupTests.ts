import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, render, configure } from 'enzyme'
import StyledTests from 'jest-styled-components'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

configure({ adapter: new Adapter() })
global.render = render
global.mount = mount
global.shallow = shallow

global.IS_TEST = true
global.WEBPACK_BUILD_TYPE = 'development'
process.env.GA_ID = 'test-id'
window.scroll = jest.fn()

afterEach(cleanup)
