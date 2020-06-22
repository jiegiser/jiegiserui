var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNams from 'classnames';
import Icon from '../Icon/icon';
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
export var Input = function (prop) {
    var _a;
    // 取出各种属性
    var disabled = prop.disabled, size = prop.size, icon = prop.icon, prepend = prop.prepend, append = prop.append, style = prop.style, restProp = __rest(prop
    // 根据属性计算不同的 className
    , ["disabled", "size", "icon", "prepend", "append", "style"]);
    // 根据属性计算不同的 className
    var classes = classNams('jiegiser-input-wrapper', (_a = {},
        _a["input-size-" + size] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = append || prepend,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in prop) {
        delete restProp.defaultValue;
        restProp.value = fixControlledValue(prop.value);
    }
    return (
    // 根据属性判断是否添加特定的节点
    React.createElement("div", { className: classes, style: style },
        prepend && React.createElement("div", { className: "jiegiser-input-group-prepend" }, prepend),
        icon && React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon, title: "title-" + icon })),
        React.createElement("input", __assign({ className: "jiegiser-input-inner", disabled: disabled }, restProp)),
        append && React.createElement("div", { className: "jiegiser-input-group-append" }, append)));
};
export default Input;
