import { createContext, ReactElement, useContext, useEffect, useState } from "react";




type Props = {
  token: string
  children: React.ReactNode
};
interface IAppContext{
  loginToken:string;
  setLoginToken:(loginToken:string)=>void|string;
}

export const CustomerContext = createContext<IAppContext>({loginToken:"",setLoginToken:()=>{}});

export function CustomerContexts() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("CustomerContexts must be used");
  }
 
  return context;
}




// export const CustomerProvider: React.FC<Props> = ({ children, token }): ReactElement => {
//   const [customers, setCustomers] = useState<Array<Customer>>([]);
//    useEffect(() => {
//       fetch('http://localhost:8080/admin/customers/all', {
//         method: 'GET',
//         headers: {
//           'Authorization': token,
//           'Content-Type': 'application/json',
//         },
//         mode: 'cors'
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setCustomers(data);
//         })
//         .catch((error) => {
//           console.log(error)
//         });s
    
//   }, [token]);

//   return (
//     <div className="n">
//     <CustomerContext.Provider value={customers}>
//       {children} 
//     </CustomerContext.Provider>
//     </div>
//   );
// };

//export const UseCustomerContext = (): Array<Customer> => useContext(CustomerContext);