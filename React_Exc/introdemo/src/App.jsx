import { useState } from 'react';

function ClickCounter({ counter, incrementCounter }) {
  return (
    <div>
      <p>Clicked {counter} times</p>
      <button onClick={incrementCounter}>Click me</button>
    </div>
  );
}

function Greeting({ counter }) {
  return <h1>Hello, welcome to the React world! You've clicked {counter} times</h1>;
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

export default App