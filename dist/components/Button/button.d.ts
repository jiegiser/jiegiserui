import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtionProps {
    /**设置 Button 的样式 */
    className?: string;
    /**设置 Button 是否被禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    children: ReactNode;
    /**设置链接 Button 的地址，仅在 btnType 为 link 有用 */
    href?: string;
}
declare type NativeButtonProps = BaseButtionProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtionProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的按钮元素，适合于完成特定的交互
 *
 * > ### 引用方法
 *
 * ~~~js
 * import { Button } from 'jiegiserUI'
 * ~~~
 * @param props
 */
export declare const Button: FC<ButtonProps>;
export default Button;
