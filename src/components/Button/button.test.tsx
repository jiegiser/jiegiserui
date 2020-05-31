import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'
const defaultProps = {
  // 测试函数是否被调用到
  onClick: jest.fn()
}

const testTypes: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  // 测试 disabled 状态下是否执行 click 事件
  onClick: jest.fn()
}

// test('our first react test case', () => {
//   // 渲染组件
//   const wrapper = render(<Button>Nice</Button>)
//   const element = wrapper.queryByText('Nice')
//   // 判断按钮是否存在
//   expect(element).toBeTruthy()
//   // 判断组件是否在文档中
//   expect(element).toBeInTheDocument()
// })

// 对测试用例进行分类
describe('test Button component', () => {
  // 第一个参数为描述
  it('shoule render the correct default button', () => {
    // 渲染组件
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')  as HTMLButtonElement
    // 判断组件是否在文档中
    expect(element).toBeInTheDocument()
    // 测试是否是一个 button
    expect(element.tagName).toEqual('BUTTON')
    // 测试类是否存在
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    // 模拟点击事件
    fireEvent.click(element)
    // onClick 方法被调用到
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('shoule render the correct component based on different props', () => {
    // 渲染组件
    const wrapper = render(<Button {...testTypes}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    // 判断组件是否在文档中
    expect(element).toBeInTheDocument()
    // 测试传入的 props
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    // 渲染组件
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://dddd.com">Link</Button>)
    const element = wrapper.getByText('Link')
    // 判断组件是否在文档中
    expect(element).toBeInTheDocument()
    // 测试是否是一个 a 标签
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    // 渲染组件
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    // 判断组件是否在文档中
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    // 按钮事件没有执行
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
