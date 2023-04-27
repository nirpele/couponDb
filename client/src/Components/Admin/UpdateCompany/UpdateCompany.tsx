
import { Company } from '../../../Entitis.type';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  token: string;
}

function UpdateCompany(props: Props): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const companyId=parseInt(id)
  const [message, setMessage] = useState<string>('');
  const [company, setCompany] = useState<Company>({ id:companyId, name: '', email: '', password: '', coupons: [] }); //export to different module
  console.log(company.id)
  
  const updateCompany = (event: React.MouseEvent): void => {
    event.preventDefault(); // prevent page refresh
    console.log(props.token);
    fetch('http://localhost:8080/admin/company/update', { //move to env var
      method: 'POST',
      headers: {
        Authorization: props.token,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(company),
    }) .then((response) => {
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
      <button onClick={() => navigate(-1)}>Back</button> {/* add "Back" button */}
      {message && <p>{message}</p>}
      <form>
        <label>Name: </label>
        <input type="name" value={company.name} onChange={(event) => setCompany((prev: any) => ({ ...prev, name: event.target.value }))} /><br />
        <label>Email: </label>
        <input type="email" value={company.email} onChange={(event) => setCompany((prev: any) => ({ ...prev, email: event.target.value }))} /><br />
        <label>Password: </label>
        <input type="password" value={company.password} onChange={(event) => setCompany((prev: any) => ({ ...prev, password: event.target.value }))} /><br />
        <button type="button" onClick={updateCompany}>Update</button>
      </form>

    </div>
  );
}

export default UpdateCompany;