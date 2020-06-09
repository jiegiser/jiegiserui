import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'

// const styles: React.CSSProperties = {
//   textAlign: 'center'
// }
// const CenterDecorator = (storyFn: any) => (
// <div style={styles}>{storyFn()}</div>
// )

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://baidu.com"> link button </Button>
  </>
)
// 第一个参数为左侧菜单父级菜单名， 第二个参数为固定参数 module
storiesOf('Button Component', module)
  // .addDecorator(CenterDecorator)
// 给父级菜单添加子级菜单，也就是添加组件
// 第一个参数为菜单名，第二个参数为一个函数，返回组件
  .add('默认 Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)