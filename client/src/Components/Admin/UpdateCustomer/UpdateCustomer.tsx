
import { Company, Customer } from '../../../Entitis.type';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


interface Props {
  token: string;
}

function UpdateCompany(props: Props): JSX.Element {

  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const customerId=parseInt(id)
  const [message, setMessage] = useState<string>('');
  const [customer,setCusomer] = useState<Customer>({ id:customerId, firstName: '',lastName:'', email: '',password:'',coupons:[] }); 

  const updateCompany =(event: React.MouseEvent): void => {
      event.preventDefault(); // prevent page refresh
      console.log(props.token);

      fetch('http://localhost:8080/admin/customer/update', { //move to env var
        method: 'POST',
        headers: {
          Authorization: props.token,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(customer),
      }).then((response) => {
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
    <div className="UpdateCompany">
          <button onClick={() => navigate(-1)}>Back</button>
          {message && <p>{message}</p>}
      <form>
        <label>First Name: </label>
        <input type="name" value={customer.firstName} onChange={(event) => setCusomer((prev: any) => ({ ...prev, firstName: event.target.value }))} /><br/>
        <label>last Name: </label>
        <input type="name" value={customer.lastName} onChange={(event) => setCusomer((prev: any) => ({ ...prev, lastName: event.target.value }))} /><br/>
        <label>Email: </label>
        <input type="email" value={customer.email} onChange={(event) => setCusomer((prev: any) => ({ ...prev, email: event.target.value }))} /><br/>
        <label>Password: </label>
        <input type="password" value={customer.password} onChange={(event) => setCusomer((prev: any) => ({ ...prev, password: event.target.value }))} /><br/>
        <button type="button" onClick={updateCompany}>Update</button>
      </form>
    </div>
  );
}

export default UpdateCompany;