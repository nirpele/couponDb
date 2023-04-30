package com.example.cuoponProject.Controller;


import com.example.cuoponProject.Exceptions.CompanyException;
import com.example.cuoponProject.Exceptions.CustomerException;
import com.example.cuoponProject.Exceptions.LoginException;
import com.example.cuoponProject.enums.Category;
import com.example.cuoponProject.services.CustomerFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("customer")
@CrossOrigin
public class CustomerController {
    private final CustomerFacade customerFacade;


    @GetMapping("findMyIdByEmail")
    public ResponseEntity<?> findMyIdByEmail(@RequestParam String email) throws CompanyException {
        try {
            return new ResponseEntity<>(customerFacade.findMyIdByEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @PostMapping("purchaseCoupon")
    public ResponseEntity<?> customerPurchaseCoupon(@RequestParam int customerId, @RequestParam int couponId, @RequestHeader(name = "Authorization") String token) throws LoginException, CustomerException {
        //check if token is valid
        try {
            customerFacade.customerPurchaseCoupon(customerId, couponId, token);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("coupons")
    public ResponseEntity<?> getCustomerCoupons(@RequestParam int customerId, @RequestHeader(name = "Authorization") String token) throws LoginException, CustomerException {
        //check if token is valid
        try {


            return new ResponseEntity<>(customerFacade.getCustomerCoupons(customerId, token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("coupons/category")
    public ResponseEntity<?> getCustomerCouponsByCategory(@RequestParam int customerId, @RequestParam Category category, @RequestHeader(name = "Authorization") String token) throws LoginException, CustomerException {
        //check if token is valid
        try {
            return new ResponseEntity<>(customerFacade.getCustomerCoupons(customerId, category, token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("coupons/maxPrice")
    public ResponseEntity<?> getCustomerCouponsByMaxPrice(@RequestParam int customerId, @RequestParam int maxPrice, @RequestHeader(name = "Authorization") String token) throws LoginException, CustomerException {
        //check if token is valid
        try {
            return new ResponseEntity<>(customerFacade.getCustomerCoupons(customerId, maxPrice, token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("getDetails")
    public ResponseEntity<?> getCustomerDetails(@RequestParam int customerId, @RequestHeader(name = "Authorization") String token) throws LoginException, CustomerException {
        try {
            return new ResponseEntity<>(customerFacade.getCustomerDetails(customerId, token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @GetMapping("allCoupons")
    public ResponseEntity<?> getAllCoupons(@RequestParam int customerId, @RequestHeader(name = "Authorization") String token) throws LoginException, CustomerException {
        //check if token is valid
        try {
            return new ResponseEntity<>(customerFacade.getAllCoupons(customerId, token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
