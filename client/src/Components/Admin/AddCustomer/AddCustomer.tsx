import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '../../../Entitis.type';


interface Props {
  token: string;
}

function AddCustomer(props: Props): JSX.Element {

  const navigate = useNavigate();
  const [customer, setCutomer] = useState<Customer>({ id: 0, firstName: '', lastName: '', email: '', password:'', coupons: [] });
  const [message, setMessage] = useState<string>('');


  const addCustomer = (event: React.MouseEvent): void => {
    event.preventDefault(); // prevent page refresh
    console.log(props.token);

    fetch('http://localhost:8080/admin/customer/add', { //move to env var
      method: 'POST',
      headers: {
        Authorization: props.token,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(customer),
    })
   .then((response) => {
    if (response.ok) {
      setMessage('Customer added successfully!');
      console.log(message)
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setMessage('Failed to add customer');
      console.log(message)
    }
  })
  .catch((error) => console.log(error));
}

  return (
    <div className="AddCompany">
      <button onClick={() => navigate(-1)}>Back</button>
      {message && <p>{message}</p>}
      <form>
        <label>First Name: </label>
        <input type="name" value={customer.firstName} onChange={(event) => setCutomer((prev: any) => ({ ...prev, firstName: event.target.value }))} /><br />
        <label>Last Name: </label>
        <input type="name" value={customer.lastName} onChange={(event) => setCutomer((prev: any) => ({ ...prev, lastName: event.target.value }))} /><br />
        <label>Email: </label>
        <input type="email" value={customer.email} onChange={(event) => setCutomer((prev: any) => ({ ...prev, email: event.target.value }))} /><br />
        <label>Password: </label>
        <input type="password" value={customer.password} onChange={(event) => setCutomer((prev: any) => ({ ...prev, password: event.target.value }))} /><br />
        <button type="button" onClick={addCustomer}>add customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;
