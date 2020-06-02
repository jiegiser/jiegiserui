import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
type SelectCallback = (selectedIndex: string) => void
type MenuMode = 'horizontal' | 'vertial'
export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}
export const MenuContext = createContext<IMenuContext>({
  index: '0'
})
const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('jiegiser-menu', className, {
    'menu-vertical': mode === 'vertial',
    'menu-horizontal': mode !== 'vertial'
  })
  const handleClick = (index: string) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    // currentActive 可能为 number 或者 undefined ，这里需要做一个判断
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // return child
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}
export default Menu