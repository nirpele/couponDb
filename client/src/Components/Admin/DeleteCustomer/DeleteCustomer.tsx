

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
type Props = {
    token: string
  };

export const DeleteCustomer = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const customerId = parseInt(id);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/admin/customer/delete?id=' + customerId, {
      method: 'POST',
      headers: {
        'Authorization': props.token,
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    }).then(() => {
      setStatus('success');
      setTimeout(() => {
        navigate(-1);
      }, 5000); // <-- Navigate back after 5 seconds
    })
    .catch(() => {
      setStatus('error');
      setTimeout(() => {
        navigate(-1);
      }, 5000); // <-- Navigate back after 5 seconds
    });
}, [customerId, navigate, props.token]);

  return (

<div className='delete-company'>
{status === 'success' && (
  <div>
    Customer deleted successfully! You will be redirected back in 5 seconds.
  </div>
)}
{status === 'error' && (
  <div>
    Error deleting customer! You will be redirected back in 5 seconds.
  </div>
)}
</div>
);
}

export default DeleteCustomer ;
    