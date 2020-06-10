import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

export const defaultMenu = () => (
  <Menu defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}}>
  <MenuItem>
    cool link 1
  </MenuItem>
  <MenuItem disabled>
    cool link 2
  </MenuItem>
  <SubMenu title="dropdown">
    <MenuItem>
      dropdown 1
    </MenuItem>
    <MenuItem>
      dropdown 2
    </MenuItem>
    <MenuItem>
      dropdown 2
    </MenuItem>
  </SubMenu>
  <MenuItem>
    cool link 3
  </MenuItem>
</Menu>
)

export const vertialMenu = () => (
  <Menu defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}} mode="vertial" defaultOpenSubMenus={['2']}>
  <MenuItem>
    cool link 1
  </MenuItem>
  <MenuItem disabled>
    cool link 2
  </MenuItem>
  <SubMenu title="dropdown">
    <MenuItem>
      dropdown 1
    </MenuItem>
    <MenuItem>
      dropdown 2
    </MenuItem>
    <MenuItem>
      dropdown 2
    </MenuItem>
  </SubMenu>
  <MenuItem>
    cool link 3
  </MenuItem>
</Menu>
)

storiesOf('Menu Component', module)
.add('Menu', defaultMenu )
.add('Vertial Menu', vertialMenu )