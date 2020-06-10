import React, { useState, createContext, CSSProperties, FC, Children, FunctionComponentElement, cloneElement } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
type SelectCallback = (selectedIndex: string) => void
type MenuMode = 'horizontal' | 'vertial'
export interface MenuProps {
  /**设置默认选中的菜单项从 0 开始 */
  defaultIndex?: string
  className?: string
  /**菜单的模式，默认为 horizontal 水平模式，可选值：vertial 垂直模式 */
  mode?: MenuMode
  style?: CSSProperties
  /**点击菜单的回调函数 */
  onSelect?: SelectCallback
  /**默认选中子菜单的 index ，从 0 开始 */
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
/**
 * 页面中最常用的菜单元素，适合于完成特定的交互
 * 
 * > ### 引用方法
 *   
 * ~~~js
 * import { Menu, MenuItem } from 'jiegiserUI'
 * ~~~
 * @param props 参数
 */
export const Menu: FC<MenuProps> = (props) => {
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
    return Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // return child
        return cloneElement(childElement, {
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
export default Menu;