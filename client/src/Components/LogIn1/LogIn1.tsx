import { useState, useCallback, FormEvent, useContext } from 'react';
import '../../Design/Login.css'
import { HomeCustomer } from '../Customer/HomeCustomer/HomeCustomer';
import { HomeCompany } from '../Company/HomeCompany/HomeCompany';
import HomeAdmin from '../Admin/HomeAdmin/HomeAdmin';
import { fetchCompanyIdByEmail, fetchCustomerIdByEmail } from '../../services/ServerService';
import { UserType } from '../../Entitis.type';


function LogIn1(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>(UserType.ADMINISTRATOR);
  const [loginToken, setLoginToken] = useState('')
  const [logId, setLogId] = useState<number | undefined>();

  const login = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {

    event.preventDefault();

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
        console.log(token)
      })
      .catch((error) => console.log(error));
  }, [email, userType, password]);

  const userHandler = () => {

    if (loginToken !== '' && userType === 'ADMINISTRATOR') {
      if (loginToken !== 'user details not valid') {
        return (
           <HomeAdmin token={loginToken}  />
          //<HomeAdmin />
        )
      }
    }
    if (loginToken !== '' && userType === 'CUSTOMER') {
      if (loginToken !== 'user details not valid') {
        // Use the fetchCustomerIdByEmail function to get the customer ID
        fetchCustomerIdByEmail(email).then(id => setLogId(id));
        return (<HomeCustomer token={loginToken} id={logId} />)
      }
    }
    if (loginToken !== '' && userType === 'COMPANY') {
      if (loginToken !== 'user details not valid') {
        fetchCompanyIdByEmail(email).then(id => setLogId(id));
        return <HomeCompany token={loginToken} id={logId} />;
      }
    }
    alert('the email, passowrd or type are wrong ');
    return <LogIn1/>;
  }


  return (

    <div className="login">
      {loginToken === '' ? <form onSubmit={login}>
        <label>Email: </label>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label>Password: </label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
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

export default LogIn1;






