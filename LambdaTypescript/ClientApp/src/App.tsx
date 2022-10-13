import * as React from 'react';
import Dash from './Pages/Dashboard';
import { BrowserRouter, Link, Route } from 'react-router-dom';
const App = () => {

  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/Dash">Dash</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />
        <Route path="/Dash" component={Dash} />

      </div>
    </BrowserRouter>

    );
  
}

export default App;