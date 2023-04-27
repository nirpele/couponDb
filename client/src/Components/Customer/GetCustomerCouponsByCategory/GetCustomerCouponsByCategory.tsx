import { FormEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Category, Coupon } from '../../../Entitis.type';

interface Props {
  token: string|undefined
  id:number|undefined
}

function GetCustomerCouponsByCategory(props: Props) {
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState<Array<Coupon>>([]);
  const [category, setCategory] = useState<Category>(Category.FOOD)
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const getByCategory = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:8080/customer/coupons/category?category=' + category + '&customerId=' + props.id, 
        {
          method: 'GET',
          headers: {
            'Authorization': props.token!,
            'Content-Type': 'application/json',
          },
          mode: 'cors'
        });
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCoupons([]);
  }, [category]);

  return (
    <div className='getAllCompanys'>
      <button onClick={() => navigate(-1)}>Back</button>
      <form onSubmit={getByCategory}>
        <label>Category:</label>
        <select value={category} onChange={(event) => setCategory(event.target.value as Category)}>
          {Object.values(Category).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type='submit'>Get Coupons By Category</button>
      </form>
      {loading && <p>Loading...</p>}
      {hasError && <p>An error occurred while fetching data.</p>}
      {!loading && !hasError && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Price</th>
              <th>Amount</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.id}</td>
                <td>{coupon.category}</td>
                <td>{coupon.price}</td>
                <td>{coupon.amount}</td>
                <td>{coupon.endDate}</td>
                <td className='pic'>
                  <img src={coupon.image} alt="#" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
   

export default GetCustomerCouponsByCategory
