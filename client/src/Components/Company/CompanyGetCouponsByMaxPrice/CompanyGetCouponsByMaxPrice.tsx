import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coupon } from '../../../Entitis.type';

interface Props {
  token: string | undefined;
  id: number | undefined;
}

const CompanyGetCouponsByMaxPrice = (props: Props) => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<Array<Coupon>>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const GetByMaxPrice = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    setHasError(false);

    try {
      const response = await fetch(
        `http://localhost:8080/company/getCoupons/maxToPay?companyId=${props.id}&maxPrice=${maxPrice}`,
        {
          method: 'GET',
          headers: {
            Authorization: props.token!,
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
        console.log(data); // log response data to console
      } else {
        console.log('Response not ok');
        setHasError(true);
      }
    } catch (error) {
      console.log(error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='getCuponsByMaxPrice'>
          <button onClick={() => navigate(-1)}>Back</button> {/* add "Back" button */}
      <form onSubmit={GetByMaxPrice}>
        <label>Max Price:</label>
        <input
          type='maxprice'value={maxPrice}
          onChange={(event) => setMaxPrice(parseInt(event.target.value))}
        />
        <button type='submit'>Get Coupons By Max Price</button>
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

export default CompanyGetCouponsByMaxPrice;