import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Coupon } from '../../../Entitis.type';

interface Props {
  token: string | undefined
  id: number | undefined
}

const GetAllCoupons = (props: Props) => {
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState<Array<Coupon>>([]);

  console.log(props.token);

  useEffect(() => {
    fetch('http://localhost:8080/customer/allCoupons?customerId=' + props.id,
      {
        method: 'GET',
        headers: {
          Authorization: props.token!,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }
    ).then((res) => res.json()).then((data) => {
      setCoupons(data);
      console.log(data); // log response data to console
    }).catch((error) => console.log(error))
  }, [])

  const [clickedCouponIds, setClickedCouponIds] = useState<number[]>([]);

  const handlePurchaseClick = (couponId: number) => {
    setClickedCouponIds([...clickedCouponIds, couponId]);
  }

  return (
    <div className="companyGetAllCoupons">
      <button onClick={() => navigate('/')}>Back</button>
      <table>
        <thead>
          <tr>
            <th>index:</th>
            <th>Coupon Purchase:</th>
            <th>Category:</th>
            <th>Start Date:</th>
            <th>End Date:</th>
            <th>Amount:</th>
            <th>Price:</th>
            <th>Image:</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon.id || index}>
              <td>{index+1}</td>
              <td>
                {clickedCouponIds.includes(coupon.id!)&&coupon.amount>0 ? (
                  <span>Coupon purchased!</span>
                ) : (
                  <Link className='professional-button' to={`/purchaseCoupon/${coupon.id}`} onClick={() => handlePurchaseClick(coupon.id!)}>
                    Purchase
                  </Link>
                )}
              </td>
              <td>{coupon.category}</td>
              <td>{coupon.startDate}</td>
              <td>{coupon.endDate}</td>
              <td>{coupon.amount}</td>
              <td>{coupon.price}</td>
              <td className='pic'><img src={coupon.image} alt="#" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllCoupons;