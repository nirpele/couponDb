package com.example.cuoponProject.Controller;

import com.example.cuoponProject.Exceptions.CompanyException;
import com.example.cuoponProject.Exceptions.LoginException;
import com.example.cuoponProject.entities.CompanyHelper;
import com.example.cuoponProject.entities.Coupon;
import com.example.cuoponProject.enums.Category;
import com.example.cuoponProject.services.CompanyFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("company")
//@CrossOrigin(origins = "http://localhost:8080", allowedHeaders = "*")
public class CompanyController {
    private final CompanyFacade companyFacade;


    //checked
    @PostMapping("addCoupon")
    public ResponseEntity<?> addCoupon(@RequestBody CompanyHelper couponInput, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        int companyId = couponInput.getCompanyId();
        Coupon coupon = couponInput.getCoupon();
        companyFacade.addCoupon(companyId, coupon, token);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    //checked
    @PostMapping("deleteCoupon")
    public ResponseEntity<?> deleteCoupon(@RequestParam int companyId,@RequestParam int couponId, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        //check if token is valid
        //int companyId = Integer.parseInt(data.get("companyId"));
        //int couponId = Integer.parseInt(data.get("couponId"));
       // @RequestBody Map<String,String> data
        companyFacade.deleteCompanyCoupon(companyId, couponId, token);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    //need to check
    @PostMapping("updateCoupon")
    public ResponseEntity<?> updateCoupon(@RequestBody CompanyHelper couponInput, @RequestHeader(name = "Authorization") String token) throws LoginException,CompanyException{
        //check if token is valid
        int companyId = couponInput.getCompanyId();
        Coupon coupon = couponInput.getCoupon();
        companyFacade.updateCoupon(companyId, coupon, token);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);

    }

    //checked
    @GetMapping("getCoupons")
    public ResponseEntity<?> getCompanyCoupons(@RequestParam int companyId, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        //check if token is valid
        return new ResponseEntity<>(companyFacade.getCompanyCoupons(companyId, token), HttpStatus.OK);
    }

    //checked
    @GetMapping("getCoupons/category")
    public ResponseEntity<?> getCouponsByCategory(@RequestParam  int companyId,@RequestParam Category category, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        //check if token is valid

        return new ResponseEntity<>(companyFacade.getCompanyCoupons(companyId, category, token), HttpStatus.OK);
    }


    @GetMapping("getCoupons/maxToPay")
    public ResponseEntity<?> getCouponsByMaxPrice(@RequestParam int companyId,@RequestParam int maxPrice, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        //check if token is valid
        return new ResponseEntity<>(companyFacade.getCompanyCoupons(companyId, maxPrice, token), HttpStatus.OK);

    }

    //checked
    @GetMapping("getDetails")
    public ResponseEntity<?> getCompanyDetails(@RequestParam int companyId, @RequestHeader(name = "Authorization") String token) throws LoginException, CompanyException {
        //check if token is valid
        return new ResponseEntity<>(companyFacade.getCompanyDetails(companyId, token), HttpStatus.OK);
    }


}
