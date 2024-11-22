import logo from './logo.svg';
import './App.css';

function App() {
  console.log(process.env.REACT_APP_API_KEY);
  
  return (
    <div className="App">
      Hello world
      {process.env.REACT_APP_API_KEY}
    </div>
  );
}

export default App;
