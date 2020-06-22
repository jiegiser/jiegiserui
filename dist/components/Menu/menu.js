import React, { useState, createContext, Children, cloneElement } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({
    index: '0'
});
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
export var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('jiegiser-menu', className, {
        'menu-vertical': mode === 'vertial',
        'menu-horizontal': mode !== 'vertial'
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        // currentActive 可能为 number 或者 undefined ，这里需要做一个判断
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // return child
                return cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};
export default Menu;
