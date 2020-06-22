import React, { CSSProperties, FC } from 'react';
declare type SelectCallback = (selectedIndex: string) => void;
declare type MenuMode = 'horizontal' | 'vertial';
export interface MenuProps {
    /**设置默认选中的菜单项从 0 开始 */
    defaultIndex?: string;
    className?: string;
    /**菜单的模式，默认为 horizontal 水平模式，可选值：vertial 垂直模式 */
    mode?: MenuMode;
    style?: CSSProperties;
    /**点击菜单的回调函数 */
    onSelect?: SelectCallback;
    /**默认选中子菜单的 index ，从 0 开始 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
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
export declare const Menu: FC<MenuProps>;
export default Menu;
