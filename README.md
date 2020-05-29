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

4. ...restProps

使用 ...restProps 取出剩余 props 传入的参数：

```ts
  const { 
    btnType,
    ...restProps
   } = props
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