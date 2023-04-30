package com.example.cuoponProject.services;

import com.example.cuoponProject.Exceptions.CompanyException;
import com.example.cuoponProject.Exceptions.CustomerException;
import com.example.cuoponProject.Exceptions.LoginException;
import com.example.cuoponProject.Login.UserDetails;
import com.example.cuoponProject.Repositories.CustomerRepo;
import com.example.cuoponProject.Utils.JWTUtil;
import com.example.cuoponProject.entities.Coupon;
import com.example.cuoponProject.entities.Customer;
import com.example.cuoponProject.enums.Category;
import com.example.cuoponProject.enums.UserType;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Data
public class CustomerFacade {
    private final CouponServes couponServes;
    private final CustomerRepo customerRepo;
    private final CompanyFacade companyFacade;
    private final JWTUtil jwtUtil;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public int findMyIdByEmail(String email) throws CompanyException {
        List<Customer> customers = couponServes.getAllCustomers().
                stream().filter(customer -> customer.getEmail().equals(email)).
                collect(Collectors.toList());
        if (customers.size() == 1) {
            return customers.get(0).getId();
        } else {
            throw new CompanyException("the id customer not exist please check what wrong");
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //finish
    public void customerPurchaseCoupon(int customerId, int couponId, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {
            Coupon coupon = couponServes.getCoupon(couponId);
            if (coupon.getAmount() > 0) {
                coupon.setAmount(coupon.getAmount() - 1);
                customerData.getCoupons().add(coupon);
                customerRepo.save(customerData);
            } else {
                throw new CustomerException("Out of stock please connect with the company for more details ");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //finish
    public List<Coupon> getCustomerCoupons(int customerId, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {
            if (customer.isPresent()) {
                return couponServes.getCustomer(customerData.getId()).getCoupons();
            } else {
                throw new CustomerException("the customer not in the system something wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //finish
    public List<Coupon> getCustomerCoupons(int customerId, Category category, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {
            if (customer.isPresent()) {
                return couponServes.getCustomer(customerData.getId()).getCoupons().stream().filter(coupon -> coupon.getCategory().equals(category)).collect(Collectors.toList());
            } else {
                throw new CustomerException("the customer not in the system something wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //need to understand the meaning of max price expression
    public List<Coupon> getCustomerCoupons(int customerId, int maxPrice, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {
            if (customer.isPresent()) {
                return couponServes.getCustomer(customerData.getId()).getCoupons().stream().filter(coupon -> coupon.getPrice() <= maxPrice).collect(Collectors.toList());
            } else {
                throw new CustomerException("the customer not in the system something wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");

        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public Customer getCustomerDetails(int customerId, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {
            if (customer.isPresent()) {
                return couponServes.getCustomer(customerId);
            } else {
                throw new CustomerException("the customer not in the system something wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");

        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public List<Coupon> getAllCoupons(int customerId, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {
            if (customer.isPresent()) {
                return couponServes.getAllCoupons();
            } else {
                throw new CustomerException("the customer not in the system something wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

}
