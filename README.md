## UI 库

> https://create-react-app.dev/docs/setting-up-your-editor/

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
