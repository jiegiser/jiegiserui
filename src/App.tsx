import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
// // 组件
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // 具体的图标
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/transition'
import Icon from './components/Icon/icon'
// 将所有的图标都进行加载
library.add(fas)
function App() {
  const [ show, setShow ] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        {/* <FontAwesomeIcon icon={faCoffee} size="10x" /> */}
        <Icon icon="coffee" theme="danger" size="10x" />
        <Menu defaultIndex='0' onSelect={(index) => {console.log(index)}}>
          <MenuItem>
            cool link 1
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>
        <br/>
        <Menu defaultIndex='0' onSelect={(index) => {console.log(index)}} mode="vertial" defaultOpenSubMenus={['2']}>
          <MenuItem>
            cool link 1
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown 1
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
            <MenuItem>
              dropdown 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>
        <br/>
        <Button size='lg' onClick={() => {setShow(!show)}}>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <div>
            <p>
              Edit <code>src/App/tsx</code> and asve to reload.
            </p>
            <p>
              Edit <code>src/App/tsx</code> and asve to reload.
            </p>
            <p>
              Edit <code>src/App/tsx</code> and asve to reload.
            </p>
            <p>
              Edit <code>src/App/tsx</code> and asve to reload.
            </p>
            <p>
              Edit <code>src/App/tsx</code> and asve to reload.
            </p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
          wrapper
        >
          <Button btnType="primary" size="lg">A large Button</Button>
        </Transition>
        <br/>
        <Button btnType={'primary'} className="custom">Primary</Button>
        <Button btnType={'default'}>Default</Button>
        <Button btnType={'default'} disabled>Disabled</Button>
        <Button btnType={'primary'} size={'lg'}>Large(Primary)</Button>
        <Button btnType={'danger'} size={'sm'}>Small(Danger)</Button>
        <Button btnType={'link'} href="http://www.baidu.com" disabled>Link(disabled)</Button>
        <Button btnType={'link'} href="http://www.baidu.com" >Link</Button>
        <br/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
