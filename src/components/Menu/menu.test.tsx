import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertial'
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
      </MenuItem>
      <MenuItem disabled index={1}>
        disabled
      </MenuItem>
      <MenuItem index={2}>
        xyz
      </MenuItem>
    </Menu> 
  )
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  // 每个 case 执行的时候都会首先进入这个函数，公用的属性以及方法可以写在这里
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // 取 Menu 最外层的元素，需要给 Menu 添加一个 data-testid 属性
    menuElement = wrapper.getByTestId('test-menu')
    // 也可以这样
    // wrapper.container.getElementsByClassName('jiegiser-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  // 测试是否根据 props 正确渲染样式
  it('shoule render correct Menu and MenuItm based on default props', () => {
    // 判断组件是否在文档中
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('jiegiser-menu test')
    // 渲染的 menuItem 是否为3个
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  // 测试行为，点击 item 是否会切换到对应的 item， 以及回调属性是否触发
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    // 测试按钮的回调事件是否执行
    // 2 是函数的参数
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  // 测试传入 mode 等于 vertial 是否渲染正确的样式
  it('should render vertial mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})