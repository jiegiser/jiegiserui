import React, { useState, createContext } from 'react'
import classNames from 'classnames'

type SelectCallback = (selectedIndex: number) => void
type MenuMode = 'horizontal' | 'vertial'
export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
}

interface IMenuContext {
  index: number
  onSelect?: SelectCallback
}
export const MenuContext = createContext<IMenuContext>({
  index: 0
})
const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('jiegiser-menu', className, {
    'menu-vertical': mode === 'vertial'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    // currentActive 可能为 number 或者 undefined ，这里需要做一个判断
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}
export default Menu