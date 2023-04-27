import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Category, Coupon } from '../../../Entitis.type';
interface Props {
  token: string | undefined
  id: number | undefined
}

const CompanyUpdateCoupon = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const couponId = parseInt(id);
  const [coupon, setCoupon] = useState<Coupon>(
    {
      id: couponId, category: Category.FOOD,
      startDate: '',
      endDate: '',
      amount: 0,
      price: 0,
      image: ''
    });


    const updateCoupon = (event: React.MouseEvent): void => {
      event.preventDefault();
      console.log(props.token);
      // check if required fields are filled in
      if (!coupon.category || !coupon.price || !coupon.amount || !coupon.endDate) {
        alert('Please fill in all required fields.');
        return;
      }
    
      // check if the price and amount are valid numbers
      if (isNaN(coupon.price) || isNaN(coupon.amount)) {
        alert('Price and amount must be valid numbers.');
        return;
      }
    
      const endDate = new Date(coupon.endDate);
      const today = new Date();
      const otherDate = new Date("2030-04-01"); // example of another date
      if (endDate < today || endDate >= otherDate) {
        alert('End date must be after today and before ' + otherDate.toDateString());
        return;
      }
    
      fetch('http://localhost:8080/company/updateCoupon?companyId=' + props.id, {
        method: 'POST',
        headers: {
          Authorization: props.token!,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(coupon),
      })
        .then((response) => {
          if (response.ok) {
            alert('Coupon updated successfully.');
            setTimeout(() => navigate(-1), 2000); // navigate back after 2 seconds
          } else {
            alert('Failed to update coupon.');
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Failed to update coupon.');
        });
    };
    
  return (
    <div className='CompanyupdateCuopon'>
      <button onClick={() => navigate(-1)}>Back</button> {/* add "Back" button */}
      <form>
        <label>Category:</label>
        <select value={coupon.category} onChange={(event) => setCoupon((prev: any) => ({ ...prev, category: event.target.value as Category }))}>
          {Object.values(Category).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select><br />
        <label>Price: </label>
        <input type="price" value={coupon.price} onChange={(event) => setCoupon((prev: any) => ({ ...prev, price: event.target.value }))} /><br />
        <label>Amount: </label>
        <input type="amount" value={coupon.amount} onChange={(event) => setCoupon((prev: any) => ({ ...prev, amount: event.target.value }))} /><br />
        <label>End Date Coupon: </label>
        <input type="date" value={coupon.endDate} onChange={(event) => setCoupon((prev: any) => ({ ...prev, endDate: event.target.value }))} /><br />
        <button type="button" onClick={updateCoupon}>update company</button>
      </form>
    </div>
  )
}

export default CompanyUpdateCoupon