import React, { ReactElement, InputHTMLAttributes, FC, ChangeEvent } from 'react'
import classNams from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用 Input */
  disabled?: boolean
  /**设置 Input 大小，支持 lg 或者 sm */
  size?: InputSize
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement
  onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或者键盘输入内容，是最基础的表单域的包装
 * 
 * ~~~js
 * // 引用
 * import { Input } from 'jiegiserUI'
 * ~~~
 * 支持 HTMLInput 的所有属性
 * @param prop 
 */
export const Input: FC<InputProps> = (prop) => {
  // 取出各种属性
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProp
  } = prop
  // 根据属性计算不同的 className
  const classes = classNams('jiegiser-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': append || prepend,
    'input-group-append': !! append,
    'input-group-prepend': !! prepend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in prop) {
    delete restProp.defaultValue
    restProp.value = fixControlledValue(prop.value)
  }
  return (
    // 根据属性判断是否添加特定的节点
    <div className={classes} style={style}>
      {
        prepend && <div className="jiegiser-input-group-prepend">{prepend}
        </div>
      }
      { icon && <div className="icon-wrapper">
        <Icon icon={icon} title= {`title-${icon}`}/>
        </div>
      }
      <input
        className="jiegiser-input-inner"
        disabled={disabled}
        { ...restProp }
      />
      { append && <div className="jiegiser-input-group-append">{append}</div> }
    </div>
  )
}

export default Input;