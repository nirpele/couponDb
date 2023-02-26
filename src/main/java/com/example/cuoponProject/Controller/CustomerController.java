package com.example.cuoponProject.Controller;


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
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class CustomerController {
    private final CustomerFacade customerFacade;


    @PostMapping("purchaseCoupon")
    public ResponseEntity<?> customerPurchaseCoupon(@RequestParam int customerId, @RequestParam int couponId, @RequestHeader String token) throws LoginException, CustomerException {
        //check if token is valid
        customerFacade.customerPurchaseCoupon(customerId, couponId, token);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("coupons")
    public ResponseEntity<?> getCustomerCoupons(@RequestParam int customerId, @RequestHeader(name = "Authorization") String token) throws LoginException, CustomerException {
        //check if token is valid
        return new ResponseEntity<>(customerFacade.getCustomerCoupons(customerId, token), HttpStatus.OK);
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("coupons/category")
    public ResponseEntity<?> getCustomerCouponsByCategory(@RequestParam int customerId, @RequestParam Category category, @RequestHeader(name = "Authorization") String token) throws LoginException, CustomerException {
        //check if token is valid
        return new ResponseEntity<>(customerFacade.getCustomerCoupons(customerId, category, token), HttpStatus.OK);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("coupons/maxPrice")
    public ResponseEntity<?> getCustomerCouponsByMaxPrice(@RequestParam int customerId, @RequestParam int maxPrice, @RequestHeader String token) throws LoginException, CustomerException {
        //check if token is valid
        return new ResponseEntity<>(customerFacade.getCustomerCoupons(customerId, maxPrice, token), HttpStatus.OK);
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("getDetails")
    public ResponseEntity<?> getCustomerDetails(@RequestParam int customerId, @RequestHeader() String token) throws LoginException, CustomerException {
        return new ResponseEntity<>(customerFacade.getCustomerDetails(customerId, token), HttpStatus.OK);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public ResponseEntity<?> getAllCoupons()throws CustomerException{
        return new ResponseEntity<>(customerFacade.getCoupons(),HttpStatus.OK);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public ResponseEntity<?> getCouponsByMaxPrice(@RequestParam double maxPrice)throws CustomerException{
        return new ResponseEntity<>(customerFacade.getCouponsByMaxPrice(maxPrice),HttpStatus.OK);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public ResponseEntity<?> getCouponsByCategory(@RequestParam Category category)throws CustomerException{
        return new ResponseEntity<>(customerFacade.getCouponsByCategory(category),HttpStatus.OK);
    }

}
