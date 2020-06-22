import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 jiegiserui 组件库</h1>
        <h2>基于 react 的组件库</h2>
        <h3>安装试试</h3>
        <code>
          npm install jiegiserui --save
        </code>
      </>
    )
  }, { info : { disable: true }})