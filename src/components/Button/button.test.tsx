import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test('our first react test case', () => {
  // 渲染组件
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.queryByText('Nice')
  // 判断按钮是否存在
  expect(element).toBeTruthy()
})