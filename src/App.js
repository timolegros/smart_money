// import logo from './logo.svg';
import logo from './metamask.svg'
import './App.css';
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useHistory } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <img src={logo}/>
        </header>
    </div>
  );
}

export default App;
