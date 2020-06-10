import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtionProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: ReactNode;
  href?: string
}

// 联合类型
type NativeButtonProps = BaseButtionProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtionProps & AnchorHTMLAttributes<HTMLElement>
// 两种类型的按钮 a 或者 button 的属性不一定两种都需要，需要变为可选属性，使用 Partial
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props) => {
  // props 中，取出所有剩余的属性 ...restProps
  const { 
    btnType,
    className, // 自定义的 class
    disabled,
    size,
    children,
    href,
    ...restProps
   } = props
  // 默认有 btn 类
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })

  if (btnType === 'link' && href) {
    return (
    <a
      className = { classes }
      href={href}
      // 其他属性
      {...restProps}
    >
      { children }
    </a>
    )
  } else {
    return (
    <button
      className={classes}
      disabled={disabled}
      {...restProps}
    >
      { children }
    </button>
    )
  }
}
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;