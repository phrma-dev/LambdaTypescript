import * as React from 'react';
import Dash from './Pages/Dashboard/Dash';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import MainNavbar from './Components/Nav';
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
        <MainNavbar />
        <Route path="/Dash" component={Dash} />

      </div>
    </BrowserRouter>

    );
  
}

export default App;