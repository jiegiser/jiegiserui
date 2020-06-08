## UI 库

> https://create-react-app.dev/docs/setting-up-your-editor/

> https://usehooks.com/page/2


1. css 中的 import 命令，但是每次调用的时候，都会创建一个额外的 http 请求。但是 scss 的 import 是将文件包含在 css 中，不需要额外的 http 请求。我们以 _ 开头定义文件， scss 是不会将这些文件编译到 css 文件中；没法编译成单独的 css 文件，只能被导入；但是我们在导入这些文件的时候，不需要添加下划线。

```css
// config
@import "variables";

// layout
@import "reboot"
```
然后在 index.tsx 中进行引入我们的初始化样式：

```ts
import './styles/index.scss';
```

Sass 作用域是从上到下的，在 button 的样式中引用了 variables 中定义的变量，就要放在下面：
```css
// config
@import "variables";

// layout
@import "reboot";

// button
@import "../components/Button/style";
```

2. 使用 classnames 库
安装 npm install classnames --save; npm install @types/classnames --save
使用：
```ts
import classNames from 'classnames'
// 默认有 btn 类以及外部传入的 className
const classes = classNames('btn', className, {
  [`btn-${btnType}`]: btnType,
  [`btn-${size}`]: size,
  'disabled': (btnType === ButtonType.Link) && disabled
})
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
```
3. 使用联合类型合并 DOM 原生属性以及新增属性;使用 Partial 将属性变为可选属性

```ts
interface BaseButtionProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string
}
// 联合类型
type NativeButtonProps = BaseButtionProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtionProps & React.AnchorHTMLAttributes<HTMLElement>
// 两种类型的按钮 a 或者 button 的属性不一定两种都需要，需要变为可选属性，使用 Partial
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
```

4. scss 中的 @each 、Maps

```scss
$sizes: 40px, 50px, 80px;
@each $size in $sizes {
  // 注意这里选择器的名称要访问变量需要使用 #{} 来包裹
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```
Maps 类似 js 中的 Object，键值对。使用圆括号来创建
```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}

```
5. 增加测试用例
新建 jest.test.js ,react 框架中包含 jest 工具。
```js
// 一个用例。每个用例测试一个独立的功能点
// 第一个参数为用例的名称，第二个是用例的逻辑，一个回调函数
test('test common matcher', () => {
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})
test('test object', () => {
  // toBe 是完全相同 toEqual 是值相同
  expect({name: 'jiegiser'}).toEqual({name: 'jiegiser'})
})
```
然后运行命令 npx jest jest.test.js，可以添加 --watch 命令，让他一直运行：npx jest jest.test.js --watch

6. 使用 testing-library 工具进行测试 react 组件库相关用例

react-script 3.3.0 版本已经将 testing-library 添加了依赖，如果低于这个版本的需要自己安装，运行命令
npm install --save-dev @testing-library/react 这个只是针对类型的断言，还有一个 @testing-library/jest-dom
是针对 dom 元素的断言，也可以进行安装，新版本的同样已经添加了依赖对于这个库；npm install --save-dev @testing-library/jest-dom；
在新版本中会有一个 setupTests.ts 文件，每当运行 test 或者 npm run test 的时候会先运行这个文件，这个文件可以存放测试的通用的内容；

下面是给 button 组件的测试用例：
```ts
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'
const defaultProps = {
  // 测试函数是否被调用到
  onClick: jest.fn()
}

const testTypes: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  // 测试 disabled 状态下是否执行 click 事件
  onClick: jest.fn()
}

// test('our first react test case', () => {
//   // 渲染组件
//   const wrapper = render(<Button>Nice</Button>)
//   const element = wrapper.queryByText('Nice')
//   // 判断按钮是否存在
//   expect(element).toBeTruthy()
//   // 判断组件是否在文档中
//   expect(element).toBeInTheDocument()
// })

// 对测试用例进行分类
describe('test Button component', () => {
  // 第一个参数为描述
  it('shoule render the correct default button', () => {
    // 渲染组件
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')  as HTMLButtonElement
    // 判断组件是否在文档中
    expect(element).toBeInTheDocument()
    // 测试是否是一个 button
    expect(element.tagName).toEqual('BUTTON')
    // 测试类是否存在
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    // 模拟点击事件
    fireEvent.click(element)
    // onClick 方法被调用到
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('shoule render the correct component based on different props', () => {
    // 渲染组件
    const wrapper = render(<Button {...testTypes}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    // 判断组件是否在文档中
    expect(element).toBeInTheDocument()
    // 测试传入的 props
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    // 渲染组件
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://dddd.com">Link</Button>)
    const element = wrapper.getByText('Link')
    // 判断组件是否在文档中
    expect(element).toBeInTheDocument()
    // 测试是否是一个 a 标签
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    // 渲染组件
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    // 判断组件是否在文档中
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    // 按钮事件没有执行
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
```

7. 如果 ts 提示一个变量有两种类型报错

如果提示报错，需要进行判断：
```ts
  const passedContext: IMenuContext = {
    // currentActive 可能为 number 或者 undefined ，这里需要做一个判断
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
```
8. type

type 类型，可以类似 Enum 类型使用：
```ts
type MenuMode = 'horizontal' | 'vertial'
export interface MenuProps {
  mode?: MenuMode
}
```
9. 测试中的 beforeEach 钩子函数

如果我们写一个测试用例的时候，每个 case 中都需要一个相同的变量，我们可以将变量放在 beforeEach 函数中：
```ts
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  // 每个 case 执行的时候都会首先进入这个函数，公用的属性以及方法可以写在这里
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // 取 Menu 最外层的元素，需要给 Menu 添加一个 data-testid 属性
    menuElement = wrapper.getByTestId('test-menu')
    // 也可以这样
    wrapper.container.getElementsByClassName('jiegiser-menu')
  })
})
```
10. jest 测试中的 cleanup
使用 cleanup 可以清除之前 case 渲染的的 dom 元素，比如我们在 beforeEach 中渲染的元素。
其他的用例在调用 beforeEach 中渲染的元素，会自动执行 cleanup 方法。
11. 将属性混入到实例中
遍历 this.props.children 使用 React.Children.map，复制属性 React.cloneElement 方法
```ts
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
```
12. css 中的 :scope 伪类
:scope 属于 CSS 伪类，它表示作为选择器要匹配的参考点的元素。当需要获取已检索到的的直接后代元素时，:scope 伪类很有用。

```js
var context = document.getElementById('context');
var selected = context.querySelectorAll(':scope > div');

document.getElementById('results').innerHTML = Array.prototype.map.call(selected, function (element) {
    return '#' + element.getAttribute('id');
}).join(', ');
```
```html
<div id="context">
    <div id="element-1">
        <div id="element-1.1"></div>
        <div id="element-1.2"></div>
    </div>
    <div id="element-2">
        <div id="element-2.1"></div>
    </div>
</div>
<p>
    Selected elements ids :
    <span id="results"></span>
</p>
```
结果：
Selected elements ids : #element-1, #element-2

13. 测试代码中解决异步问题
如果我们写的代码中有异步操作，直接写 case 会不通过，我们需要引入 wait 方法：
我们的代码中有异步操作：
```ts
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
```
```ts
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  it('should show dropdown items when hover on subMenu', async () => {
    // queryByText 会返回 HTMLElement 或者 none
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
  })
})
```

14. css 中 display 以及 react 中的动画

css 中的 display: none 到 display: block 的变化中添加 translate 是不起作用的;所以我们在设置一个元素从无到有的渐变只能通过 opacity 属性来实现，但是这个属性只是设置元素的透明度，元素本身还是显示在那里，存在于 dom 结构中。这时候我们可以借助 react 的一些动画实现的库，这里使用 react-transition-group ，他在元素从无到有的生命周期上添加了 class 来控制动画；

> transition 属性不会继承

15. storybook 的使用

首先进行安装：npx -p @storybook/cli sb init

> https://storybook.js.org/docs/configurations/typescript-config/

首先配置 storybook 的 ts 开发环境：
1. 修改 storybook 的配置文件：

修改 .storybook 下的 main.js 文件
只需要将 stories.js 修改为 stories.tsx
```js
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ]
};

```
然后将 src/stories 下面的所有文件都修改为 tsx 后缀的文件就可以了。