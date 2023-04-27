import { useContext } from 'react';
import { CustomerContext } from '../contexts/AppContextCustomer';
import { UserType } from './../Entitis.type';


export async function fetchCustomers(token: string) {
  try {
    const res = await fetch("http://localhost:8080/admin/customers/all", {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function Login2(email: string, password: string, userType: UserType): Promise<any> {
  const { loginToken,setLoginToken } = useContext(CustomerContext);
  console.log('aa')
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
      console.log(token)
      return loginToken;
    })
    .catch((error) => {console.log(error)
    return error;
    })
}catch(error){
 console.log(error)
}
}











export async function fetchCustomerIdByEmail(
  email: string
): Promise<number | undefined> {
  try {
    const data = await fetch(
      "http://localhost:8080/customer/findMyIdByEmail?email=" + email,
      {
        headers: {
          "Content-Type": "application/json",
        },

        mode: "cors",
        method: "GET",
      }
    );
    const data_1 = await data.text();
    return parseInt(data_1);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}


export async function fetchCompanyIdByEmail(
  email: string
): Promise<number | undefined> {
  try {
    const data = await fetch(
      "http://localhost:8080/company/findMyIdByEmail?email=" + email,
      {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "GET",
      }
    );
    const data_1 = await data.text();

    // localStorage.setItem('id', String(data_1));
    
    return parseInt(data_1);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
