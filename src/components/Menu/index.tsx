import { FC } from 'react'
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu' 
import MenuItem, { MenuItemProps } from './menuItem'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubItem: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubItem = SubMenu

export default TransMenu