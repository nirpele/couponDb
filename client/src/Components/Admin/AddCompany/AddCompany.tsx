import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../../Entitis.type';

interface Props {
  token: string;
}

function AddCompany(props: Props): JSX.Element {
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company>({ id: 0, name: '', email: '', password:'', coupons: [] });
  const [message, setMessage] = useState<string>('');

  const addCompany = (event: React.MouseEvent): void => {
    event.preventDefault(); // prevent page refresh
    console.log(props.token);

    fetch('http://localhost:8080/admin/company/add', {
      method: 'POST',
      headers: {
        Authorization: props.token,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(company),
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Company added successfully!');
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          setMessage('Failed to add company');
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="AddCompany">
      <button onClick={() => navigate(-1)}>Back</button>
      {message && <p>{message}</p>}
      <form>
        <label>Name: </label>
        <input type="name" value={company.name} onChange={(event) => setCompany((prev: any) => ({ ...prev, name: event.target.value }))} /><br/>
        <label>Email: </label>
        <input type="email" value={company.email} onChange={(event) => setCompany((prev: any) => ({ ...prev, email: event.target.value }))} /><br/>
        <label>Password: </label>
        <input type="password" value={company.password} onChange={(event) => setCompany((prev: any) => ({ ...prev, password: event.target.value }))} /><br/>
        <button type="button" onClick={addCompany}>add company</button>
      </form>
    </div>
  );
}

export default AddCompany;
