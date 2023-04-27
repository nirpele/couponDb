import { useState, useCallback, FormEvent, useContext } from 'react';
import '../../Design/App.css'
import { HomeCustomer } from '../Customer/HomeCustomer/HomeCustomer';
import { HomeCompany } from '../Company/HomeCompany/HomeCompany';
import HomeAdmin from '../Admin/HomeAdmin/HomeAdmin';
import { fetchCompanyIdByEmail, fetchCustomerIdByEmail, Login2 } from '../../services/ServerService';
import { UserType } from '../../Entitis.type';
import { CustomerContext } from '../../contexts/AppContextCustomer';


  
  function LoginUseContext(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState<UserType>(UserType.ADMINISTRATOR);
    // const [loginToken, setLoginToken] = useState<string>("");
    const [logId, setLogId] = useState<number | undefined>();
    const { loginToken, setLoginToken } = useContext(CustomerContext);

    async function login20(email: string, password: string, userType: UserType): Promise<any> {
      
      try {
        await fetch('http://localhost:8080/login', {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            userType: userType,
          }),
          mode: 'cors',
          method: 'POST',
        })
        .then((data) => data.text())
        .then((token) => {
          setLoginToken(token);
          // console.log(token)
          return loginToken;
        })
        .catch((error) => {console.log(error)
        return error;
        })
      }
      catch(error){
        console.log(error)
      }
    }
    

    const login1 = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault(); // prevent page refresh
      
      await login20(email, password, userType);
     
    }, [email, password, userType]);
  
    const userHandler = () => {
     
      if (loginToken === '' || loginToken === undefined) {
        return null;
      }
  
      if (loginToken !== undefined && userType === 'ADMINISTRATOR' && logId === undefined) {
        
        return (
         // <HomeAdmin />
         <HomeAdmin token={loginToken}  />
        )
      }

      if (loginToken !== undefined && userType === 'CUSTOMER' && logId === undefined) {
        // Use the fetchCustomerIdByEmail function to get the customer ID
        fetchCustomerIdByEmail(email).then(id => setLogId(id));
        return (<HomeCustomer token={loginToken} id={logId} />)
      }

      if (loginToken !== undefined && userType === 'COMPANY' && logId === undefined) {
       
        fetchCompanyIdByEmail(email).then(id => setLogId(id));

        // let idOfUser = parseInt(String(localStorage.getItem('id')));
        // localStorage.removeItem('id');

        return <HomeCompany token={loginToken} id={logId} />;
      }

      return null;
    }
  return (

    <div className="login">
      {loginToken === '' ? <form onSubmit={login1}>
        <label>Email: </label>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /><br />
        <label>Password: </label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
        <label>userType:</label>
        <select value={userType} onChange={(event) => setUserType(event.target.value as UserType)}>
          {Object.values(UserType).map((userType) => (
            <option key={userType} value={userType}>
              {userType}
            </option>
          ))}
        </select>
        <button type="submit">Login</button>
      </form>
        :
        userHandler()
      }

    </div>
  );
}

export default LoginUseContext;






