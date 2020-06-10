import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'

const marginAttribute: React.CSSProperties = {
  marginTop: '20px',
  marginRight: '15px'
}
const defaultButton = () => (
  <Button onClick={action('clicked')} style={marginAttribute}> default button </Button>
)
const buttonWithSize = () => (
  <>
    <Button size="lg" style={marginAttribute}> large button </Button>
    <Button size="sm" style={marginAttribute}> small button </Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary" style={marginAttribute}> primary button </Button>
    <Button btnType="danger" style={marginAttribute}> danger button </Button>
    <Button btnType="link" href="https://baidu.com" style={marginAttribute}> link button </Button>
  </>
)
storiesOf('Button Component', module)
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)