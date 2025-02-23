import { useState } from 'react';
import './App.css';

function ClickCounter({ counter, incrementCounter }) {
  return (
    <div>
      <p>Clicked {counter} times</p>
      <button onClick={incrementCounter}>Click me</button>
    </div>
  );
}

function Greeting({ counter }) {
  return (
    <div>
      <h1>Hello, welcome to the React world! You've clicked {counter} times</h1>
      <p>This is Sakhawat page</p>
    </div>
  );
}

function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => setCounter(counter + 1);

  return (
    <div>
      <Greeting counter={counter} />
      <ClickCounter counter={counter} incrementCounter={incrementCounter} />
    </div>
  );
}

export default App;
