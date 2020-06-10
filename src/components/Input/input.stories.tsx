import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './input'
const marginAttribute: React.CSSProperties = {
  marginTop: '20px',
  marginRight: '15px',
  width: '300px'
}

const defaultInput = () => (
  <Input
    style={marginAttribute}
    placeholder="placeholder"
    onChange={action('changed')}
  />
)
const disabledInput = () => (
  <Input
    disabled={true}
    style={marginAttribute}
    placeholder="placeholder"
    onChange={action('changed')}
  />
)

const iconInput = () => (
  <Input
    style={marginAttribute}
    placeholder="placeholder"
    icon="search"
    onChange={action('changed')}
  />
)

const sizeInput = () => (
  <>
    <Input
      style={marginAttribute}
      placeholder="placeholder"
      icon="search"
      size="lg"
      onChange={action('changed')}
    />

    <Input
      style={marginAttribute}
      placeholder="placeholder"
      icon="search"
      size="sm"
      onChange={action('changed')}
    />
  </>
)

const pandInput = () => (
  <>
    <Input
      style={marginAttribute}
      placeholder="placeholder"
      onChange={action('changed')}
      append={".com"}
    />
    <Input
      style={marginAttribute}
      placeholder="placeholder"
      onChange={action('changed')}
      prepend={"http://"}
    />
  </>
)
storiesOf('Input Component', module)
  .add('Input', defaultInput)
  .add('Disabled Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后缀的 Input', pandInput)