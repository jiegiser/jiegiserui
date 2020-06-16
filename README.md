## UI 库

> https://create-react-app.dev/docs/setting-up-your-editor/

> https://usehooks.com/page/2


### scss 中的 import
css 中的 import 命令，每次调用的时候，都会创建一个额外的 http 请求。但是 scss 的 import 是将文件包含在 css 中，不需要额外的 http 请求。我们以 _ 开头定义文件， scss 是不会将这些文件编译到 css 文件中；没法编译成单独的 css 文件，只能被导入；但是我们在导入这些文件的时候，不需要添加下划线。

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

### 使用 classnames 库
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
### 使用联合类型合并 DOM 原生属性以及新增属性;使用 Partial 将属性变为可选属性

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

### scss 中的 @each 、Maps

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
### 增加测试用例
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

### 使用 testing-library 工具进行测试 react 组件库相关用例

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

### 如果 ts 提示一个变量有两种类型报错

如果提示报错，需要进行判断：
```ts
  const passedContext: IMenuContext = {
    // currentActive 可能为 number 或者 undefined ，这里需要做一个判断
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
```
### type

type 类型，可以类似 Enum 类型使用：
```ts
type MenuMode = 'horizontal' | 'vertial'
export interface MenuProps {
  mode?: MenuMode
}
```
### 测试中的 beforeEach 钩子函数

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
### jest 测试中的 cleanup
使用 cleanup 可以清除之前 case 渲染的的 dom 元素，比如我们在 beforeEach 中渲染的元素。
其他的用例在调用 beforeEach 中渲染的元素，会自动执行 cleanup 方法。
### 将属性混入到实例中
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
### css 中的 :scope 伪类
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

### 测试代码中解决异步问题
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

### css 中 display 以及 react 中的动画

css 中的 display: none 到 display: block 的变化中添加 translate 是不起作用的;所以我们在设置一个元素从无到有的渐变只能通过 opacity 属性来实现，但是这个属性只是设置元素的透明度，元素本身还是显示在那里，存在于 dom 结构中。这时候我们可以借助 react 的一些动画实现的库，这里使用 react-transition-group ，他在元素从无到有的生命周期上添加了 class 来控制动画；

> transition 属性不会继承

### storybook 的使用

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

如果需要加载全局样式：
```js
// '../src/styles/index.scss' 直接在这里配置即可
module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/styles/index.scss'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ]
};

```

增加自己的 story，在自己的组件新建一个 button.stories.tsx 文件：

```ts
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)
// 第一个参数为左侧菜单父级菜单名， 第二个参数为固定参数 module
storiesOf('Button Component', module)
// 给父级菜单添加子级菜单，也就是添加组件
// 第一个参数为菜单名，第二个参数为一个函数，返回组件
  .add('默认 Button', defaultButton)
```

storybook 添加装饰器，比如我们可以设置我们组件显示的外面的样式：
通过 addDecorator(CenterDecorator) 方法进行添加装饰器。
```ts
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'

const styles: React.CSSProperties = {
  textAlign: 'center'
}
const CenterDecorator = (storyFn: any) => (
<div style={styles}>{storyFn()}</div>
)

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://baidu.com"> link button </Button>
  </>
)
// 第一个参数为左侧菜单父级菜单名， 第二个参数为固定参数 module
storiesOf('Button Component', module)
  .addDecorator(CenterDecorator)
// 给父级菜单添加子级菜单，也就是添加组件
// 第一个参数为菜单名，第二个参数为一个函数，返回组件
  .add('默认 Button', defaultButton)
```
如果需要全局添加，可以在 .storybook 中新建 preview.js :
```js
// './Decorator/Center'
import React from 'react'

const styles: React.CSSProperties = {
  textAlign: 'center'
}
const CenterDecorator = (storyFn: any) => (
<div style={styles}>{storyFn()}</div>
)
export default CenterDecorator

// preview.js
import CenterDecorator from './Decorator/Center'
import { addDecorator } from '@storybook/react';
addDecorator(CenterDecorator);
```

> 更多 addons ：https://storybook.js.org/addons/
> https://storybook.js.org/docs/addons/introduction/#1-decorators

### storybook/addons-info 插件的使用
这个插件就是显示组件的一些信息，还可以进行复制组件代码，首先进行安装：
npm i -D @storybook/addon-info 支持 ts： npm install --save @types/storybook__addon-info

> https://github.com/storybookjs/storybook/tree/release/3.4/addons/info
使用：
```ts
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import Button from './button'

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)
storiesOf('Button Component', module)
  // 使用
  .addDecorator(withInfo)
  // 修改属性--直接链式操作
  .addParameters({
    info: 'this is a very niece component',
    inline: true
  })
  .add('默认 Button', defaultButton)
```

注意他的 info 属性支持很多语法，比如 markdown 语法，以及可以进行写脚本：

```js
  .addDecorator(withInfo)
  .addParameters({
    info: `
      this is a very niece component
      ### this is a header
      ~~~js
        const a = 'hello'
      ~~~
    `,
    inline: true
  })
```
也可以在 add 方法的第三个参数添加属性信息：
```js
  .add('不同尺寸的 Button', buttonWithSize, {
    inline: false
  })
```

### react-docgen
一个文档生成器，根据组件的一些属性，生成表格；
首先需要改造自己的组件，将一些属性通过 import 的方法进行引入：
```js
// 通过 import 的方式导出所有属性
import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
// 需要将自己的组件导出
export const Button: FC<ButtonProps> = (props) => {

}
// 注意这里需要添加一个分号
export default Button;
```
在 webpack.config.js 中添加：
```js
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      },
      // 添加 loader 
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          // 去掉原生属性的添加
          shouldExtractLiteralValuesFromEnum: true,
          // 这里是过滤不添加 react 中的一些属性
          propFilter: (prop) => {
            if (prop.parent) {
              return !prop.parent.fileName.includes('node_modules')
            }
            return true            
          }
        }
      }
    ]
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
```

我们发现我们导出的表格的属性并没有一些说明以及注释，需要使用 jsDoc 的模式来进行对 js进行注释，这样注释内容会被解析并展示出来：
```js
import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
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
  href?: string
}
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
export const Button: FC<ButtonProps> = (props) => {
}

export default Button;
```
### ts 的 Omit

Omit 是用来移除或者忽略接口中的一个属性：

比如我们自定义的组件有一个 size 属性，但是我们还需要给用户去自定义更多的 html 原生的更多属性，所以需要继承 InputHTMLAttributes， 但是该属性有一个 size 属性，所以这个时候我们需要忽略这个属性，或者修改我们自身定义的属性名：
```ts
// Omit 第一个参数是 interface ，第二个是需要忽略的属性名
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  size?: InputSize
}
```

### 指定运行测试用例

可以使用命令  npm test -- -t "auto" 来只运行指定的测试用例，注意如果测试用例为 autoComplete.test.tsx，就写成 npm test -- -t "auto" 是可以匹配到的。

### Fetch
缺点：
- 只对网路请求报错，对 400，500 都当做成功的请求
- 默认不会带 cookie
- 不支持 abort，不支持超时控制
- 没有办法原生检测请求的进度

### mock server
- https://jsonplaceholder.typicode.com/
- https://designer.mocky.io/design


### useState 更新数组对象

我们一般使用 useState 更新数据时，直接使用它返回的第二个方法参数进行修改；因为这个方法更新数据是一个异步的过程；
我们如果想要实时获取更新后的数据，可以在第二个方法中，传入一个函数进行修改：
注意更新的时候是返回一个新的对象，而不是对原有的进行修改。
```ts
const [ fileList, setFileList] = useState<UploadFile[]>([])
// setFileList
updateFileList(_file, {
  percent: percentage,
  status: 'uploading'
})
// 如果直接使用 setFileList 更新数据，获取到的是最后一次更新的结果
// _file.percent = percentage
// _file.status = 'uploading'
// setFileList([_file])

// {...file, ...updateobj} 返回替换属性后的新的对象
// 第一个参数为需要更新的文件，第二个参数是需要更新的属性， partial 的意思是更新的属性为 UploadFile 中的可选的一些属性，并不是所有的都更新
const updateFileList = (updateFile: UploadFile, updateobj: Partial<UploadFile>) => {
  setFileList(prevList => {
    return prevList.map(file => {
      if (file.uid === updateFile.uid) {
        return {...file, ...updateobj}
      } else {
        return file
      }
    })
  })
}
```