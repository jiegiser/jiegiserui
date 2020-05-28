import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Primary} className="custom">Primary</Button>
        <Button btnType={ButtonType.Default}>Default</Button>
        <Button btnType={ButtonType.Default} disabled>Disabled</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large(Primary)</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small(Danger)</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>Link(disabled)</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" >Link</Button>
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
