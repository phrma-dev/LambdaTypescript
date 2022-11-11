import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/state-management/store';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";


const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  
 
  <Provider store={store}>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
    </Provider>

  ,
    document.getElementById('root')
);
