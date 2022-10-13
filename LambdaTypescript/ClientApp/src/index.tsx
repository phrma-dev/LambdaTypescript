import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Dash from './pages/dashboard/Dash';
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
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
  </BrowserRouter>,
   document.getElementById("root"));
registerServiceWorker();

