import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) => {console.log(index)}}>
          <MenuItem index={0}>
            cool link 1
          </MenuItem>
          <MenuItem index={1} disabled>
            cool link 2
          </MenuItem>
          <MenuItem index={2}>
            cool link 3
          </MenuItem>
        </Menu>
        <br/>
        <Menu defaultIndex={0} onSelect={(index) => {console.log(index)}} mode="vertial">
          <MenuItem index={0}>
            cool link 1
          </MenuItem>
          <MenuItem index={1} disabled>
            cool link 2
          </MenuItem>
          <MenuItem index={2}>
            cool link 3
          </MenuItem>
        </Menu>
        <br/>
        <Button btnType={ButtonType.Primary} className="custom">Primary</Button>
        <Button btnType={ButtonType.Default}>Default</Button>
        <Button btnType={ButtonType.Default} disabled>Disabled</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large(Primary)</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small(Danger)</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>Link(disabled)</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" >Link</Button>
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
