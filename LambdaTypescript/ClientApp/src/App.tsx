import * as React from 'react';
import Dash from './pages/dashboard/Dash';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const App = () => {

  return (

    <Router>
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
        <Route exact path="/Dash" component={Dash} />
   
      </div>
    </Router>
  );
};

export default App;
