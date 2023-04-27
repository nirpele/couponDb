import React, {  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  token: string | undefined;
  companyId: number | undefined;
}

const CompanyDeleteCoupon = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const couponId = parseInt(id);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);


 
    console.log(props.token);
    useEffect(() => {
    fetch(
      `http://localhost:8080/company/deleteCoupon?companyId=${props.companyId}&couponId=${couponId}`,
      {
        method: 'POST',
        headers: {
          Authorization: props.token!,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }
    ).then(() => {
      setStatus('success');
      setTimeout(() => {
        navigate('/getCoupons/all');
      }, 3000); // <-- Navigate back after 3 seconds
    })
    .catch(() => {
      setStatus('error');
      setTimeout(() => {
        navigate('/getCoupons/all');
      }, 3000); // <-- Navigate back after 3 seconds
    });
    }, [couponId, props.token]);

  return (
    <div className='delete-company'>
    {status === 'success' && (
      <div>
        Coupon deleted successfully! You will be redirected back in 3 seconds.
      </div>
    )}
    {status === 'error' && (
      <div>
        Error deleting Coupon! You will be redirected back in 3 seconds.
      </div>
    )}
  </div>
  );
};

export default CompanyDeleteCoupon;