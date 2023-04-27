import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  token: string | undefined;
  id: number | undefined;
}

const CustomerPurchaseCoupon = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const couponId = parseInt(id);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const purchaseCoupon = () => {
    setIsFetching(true);
    fetch(
      `http://localhost:8080/customer/purchaseCoupon?couponId=${couponId}&customerId=${props.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: props.token!,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }
    )
      .then((response) => {
        if (response.ok) {
          setStatus('success');
          setTimeout(() => {
            navigate('/allCoupons');
          }, 2000);
        } else {
          setStatus('error');
          alert('Failed to purchase coupon. Please try again later.');
          setTimeout(() => {
            navigate('/allCoupons');
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus('error');
        alert('Failed to purchase coupon. Please try again later.');
        setTimeout(() => {
          navigate('/allCoupons');
        }, 2000);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };


  const handleCancelPurchase = () => {
    navigate(-1);
  };

  return (
    <div className='delete-company'>
      {status === null && (
        <div>
          <p>Are you sure you want to purchase this coupon?</p>
          <button onClick={purchaseCoupon} disabled={isFetching}>
            {isFetching ? 'Purchasing...' : 'Yes'}
          </button>
          <button onClick={handleCancelPurchase}>No</button>
        </div>
      )}
      {status === 'success' && (
        <div>
          Coupon purchased successfully! You will be redirected back in 3 seconds.
        </div>
      )}
      {status === 'error' && (
        <div>
          Error purchasing coupon! You will be redirected back in 3 seconds.
        </div>
      )}
    </div>
  );
};

export default CustomerPurchaseCoupon;
