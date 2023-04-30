package com.example.cuoponProject.Controller;

import com.example.cuoponProject.Exceptions.CompanyException;
import com.example.cuoponProject.Exceptions.CustomerException;
import com.example.cuoponProject.Exceptions.LoginException;
import com.example.cuoponProject.entities.Company;
import com.example.cuoponProject.entities.Customer;
import com.example.cuoponProject.services.AdminFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin")
@CrossOrigin
public class AdminController {
    private final AdminFacade adminFacade;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //finito la comedia
    @PostMapping("company/add")
    public ResponseEntity<?> addCompany(@RequestBody Company company, @RequestHeader(name = "Authorization") String token) throws LoginException , CompanyException {
        //check if token is valid
        try {
            adminFacade.addCompany(company, token);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (LoginException |CompanyException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //we prefer to delete the class and work with map
    //need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    //finito la comedia
    @PostMapping("company/delete")
    public ResponseEntity<?> deleteCompany(@RequestParam int id, @RequestHeader(name = "Authorization") String token) throws LoginException {
        try {
            //check if token is valid
            adminFacade.deleteCompany(id, token);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (LoginException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @PostMapping("company/update")
    public ResponseEntity<?> updateCompany(@RequestBody Company company, @RequestHeader(name = "Authorization") String token) throws LoginException,CompanyException {
        //check if token is valid
        try {
            adminFacade.updateCompany(company, token);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (LoginException |CompanyException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //finito la comedia
    @GetMapping("company/all")
    public ResponseEntity<?> getAllCompanies(@RequestHeader(name = "Authorization") String token) throws LoginException {
        //check if token is valid
        try {
            return new ResponseEntity<>(adminFacade.getAllCompanies(token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("getCompany")
    public ResponseEntity<?> getOneCompany(@RequestParam int id, @RequestHeader(name = "Authorization") String token) throws LoginException {
        //check if token is valid
        try {
            return new ResponseEntity<>(adminFacade.getOneCompany(id, token), HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @PostMapping("customer/add")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer, @RequestHeader(name = "Authorization") String token) throws LoginException {
        //check if token is valid
        try{
        adminFacade.addCustomer(customer, token);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);}
        catch (CustomerException|LoginException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @PostMapping("customer/update")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer, @RequestHeader(name = "Authorization") String token) throws LoginException {
        //check if token is valid
        try {
            adminFacade.updateCustomer(customer, token);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (CustomerException|LoginException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @PostMapping("customer/delete")
    public ResponseEntity<?> deleteCustomer(@RequestParam int id, @RequestHeader(name = "Authorization") String token) throws LoginException {
       try {
        //check if token is valid
        adminFacade.deleteCustomer(id, token);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);}
       catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @GetMapping("customers/all")
    public ResponseEntity<?> getAllCustomers(@RequestHeader(name = "Authorization") String token) throws LoginException {
        try {
        //check if token is valid
        return new ResponseEntity<>(adminFacade.getAllCustomers(token), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //need to change that the id get from the body not from path, to do that we need to get map with key and value and change it back to int
    @GetMapping("customer")
    public ResponseEntity<?> getOneCustomer(@RequestParam int customerId, @RequestHeader(name = "Authorization") String token) throws LoginException {
        //check if token is valid
        try {
        return new ResponseEntity<>(adminFacade.getOneCustomer(customerId, token), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}