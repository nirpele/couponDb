import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  token: string
};

export const DeleteCompany = (props: Props) => {
  const { id } = useParams<{ id: any }>();
  const companyId = parseInt(id);
  const navigate = useNavigate();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/admin/company/delete?id=' + companyId, {
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
        }, 3000); // <-- Navigate back after 3 seconds
      })
      .catch(() => {
        setStatus('error');
        setTimeout(() => {
          navigate(-1);
        }, 3000); // <-- Navigate back after 3 seconds
      });
  }, [companyId, navigate, props.token]);

  return (
    <div className='delete-company'>
      {status === 'success' && (
        <div>
          Company deleted successfully! You will be redirected back in 5 seconds.
        </div>
      )}
      {status === 'error' && (
        <div>
          Error deleting company! You will be redirected back in 5 seconds.
        </div>
      )}
    </div>
  );
}

export default DeleteCompany;