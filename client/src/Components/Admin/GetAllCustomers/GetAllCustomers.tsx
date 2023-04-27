import { Customer } from '../../../Entitis.type';
import { useState, useEffect } from 'react';
import '../../../Design/GetAll.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

type Props = {
  token: string

};

export const GetAllCustomers = (props: Props) => {


  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Array<Customer>>([]);

  useEffect(() => {
    fetch('http://localhost:8080/admin/customers/all', {
      method: 'GET',
      headers: {
        'Authorization': props.token,
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div >
      <button onClick={() => navigate(-1)}>Back</button> {/* add "Back" button */}

      <table>
        <thead>
          <tr>
            <th>id:</th>
            <th> first Name:</th>
            <th> last Name:</th>
            <th>email</th>
            <th>password</th>
            <th>coupons:</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>
                  <div>{customer.id}</div>
                </td>
                <td>
                  <Link to={`/getOneCustomer/${customer.id}`}>
                    <div className="name">{customer.firstName}</div>
                  </Link>
                </td>
                <td>
                  <div>{customer.lastName}</div>
                </td>
                <td>
                  <div>{customer.email}</div>
                </td>
                <td>
                  <div>{customer.password}</div>
                </td>
                <td>
                  <table>

                    <tbody>
                      {customer.coupons.map((coupon) => {
                        return (
                          <tr key={coupon.id}>
                            <td>{coupon.id}</td>
                            <td>{coupon.category}</td>
                            <td className='pic'>
                              <img src={coupon.image} alt="#" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="add">
        <Link to='/addCustomer' className='professional-button'>Add Customer</Link>
      </div>
    </div>
  )
}



