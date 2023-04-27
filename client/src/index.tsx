import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import LogIn1 from './Components/LogIn1/LogIn1';
import Login from './Components/LoginUseContext/LoginUseContext';
import { CustomerContext } from './contexts/AppContextCustomer';



const root = ReactDOM.createRoot(
  // const [loginToken,setLoginToken] = useState('');
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LogIn1 />
  </React.StrictMode>
);


