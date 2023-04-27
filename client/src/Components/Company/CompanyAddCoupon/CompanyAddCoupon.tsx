
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  Category, Coupon } from '../../../Entitis.type';

interface Props {
  token: string | undefined
  id: number | undefined
}




const CompanyAddCoupon = (props: Props) => {
  const navigate = useNavigate();

  
  const [coupon, setCoupon] = useState<Coupon>(
    {
      id: 0,
      category: Category.FOOD,
      startDate: '',
      endDate: '',
      amount: 0,
      price: 0,
      image: '../../../images/FOOD.png'
    });
    
    
    const addCoupon = (event: React.MouseEvent): void => {
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
    
      fetch('http://localhost:8080/company/addCoupon?companyId=' + props.id, {
        method: 'POST',
        headers: {
          Authorization: props.token!,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(coupon),
      }).then(() => {
        navigate(-1);
      }).catch((error) => console.log(error));
    } 
 


  return (
    <div className='addCoupon'>
    <button onClick={() => navigate(-1)}>Back</button> {/* add "Back" button */}
    <form>
      <label>Category:</label>
      <select value={coupon.category} onChange={(event) =>  setCoupon((prev: Coupon) => ({
      ...prev,
      category: event.target.value as Category,
      image: '../../../images/' + event.target.value +'.png'  // update image based on selected category
    }))}><br />
        {Object.values(Category).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}</select>
        
      <label>Price: </label>
      <input type="price" value={coupon.price} onChange={(event) => setCoupon((prev: any) => ({ ...prev, price: event.target.value }))} /><br />
      <label>Amount: </label>
      <input type="amount" value={coupon.amount} onChange={(event) => setCoupon((prev: any) => ({ ...prev, amount: event.target.value }))} /><br />
      <label>End Date Coupon: </label>
      <input type="date" value={coupon.endDate} onChange={(event) => setCoupon((prev: any) => ({ ...prev, endDate: event.target.value }))} /><br />
      <button type="button" onClick={addCoupon}>Add coupon</button>
    </form>
    </div>
  )
}

export default CompanyAddCoupon

