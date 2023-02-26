package com.example.cuoponProject.services;

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
    private final JWTUtil jwtUtil;

    //finish
    public void customerPurchaseCoupon(int customerId, int couponId, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {
            if (customer.isPresent()) {
                Coupon coupon = couponServes.getCoupon(couponId);
                if (coupon != null) {
                    customerData.getCoupons().add(coupon);
                    customerRepo.save(customerData);
                } else {
                    System.out.println("this coupon not exist in the system");
                }
            } else {
                throw new CustomerException("the customer not in the system something wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    //finish
    public List<Coupon> getCustomerCoupons(int customerId, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {
            if (customer.isPresent()) {
                return couponServes.getCustomer(customerId).getCoupons();
            } else {
                throw new CustomerException("the customer not in the system something wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    //finish
    public List<Coupon> getCustomerCoupons(int customerId, Category category, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {
            if (customer.isPresent()) {
                return couponServes.getCustomer(customerId).getCoupons().stream().filter(coupon -> coupon.getCategory().equals(category)).collect(Collectors.toList());
            } else {
                throw new CustomerException("the customer not in the system something wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");
        }
    }

    //need to understand the meaning of max price expression
    public List<Coupon> getCustomerCoupons(int customerId, double maxPrice, String token) throws CustomerException, LoginException {
        Optional<Customer> customer = couponServes.getCustomerRepo().findById(customerId);
        Customer customerData = customer.get();
        boolean isValid = jwtUtil.validateToken(token, new UserDetails(customerData.getPassword(), customerData.getEmail(), UserType.CUSTOMER));
        if (isValid) {

            if (customer.isPresent()) {
                return couponServes.getCustomer(customerId).getCoupons().stream().filter(coupon -> coupon.getPrice() <= maxPrice).collect(Collectors.toList());
            } else {
                throw new CustomerException("the customer not in the system something wrong");
            }
        } else {
            throw new LoginException("mail or password are wrong please try again");

        }
    }

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
        public List<Coupon> getCoupons() throws CustomerException {
            return couponServes.getCouponRepo().findAll();
        }

        public List<Coupon> getCouponsByMaxPrice(double maxPrice) throws CustomerException {
            return couponServes.getCouponRepo().findAll().stream().filter(coupon -> coupon.getPrice()<maxPrice).collect(Collectors.toList());
        }
        public List<Coupon> getCouponsByCategory(Category category) throws CustomerException {
            return couponServes.getCouponRepo().findAll().stream().filter(coupon -> coupon.getCategory().equals(category)).collect(Collectors.toList());
        }



}
