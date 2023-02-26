package com.example.cuoponProject.services;

import com.example.cuoponProject.Exceptions.LoginException;
import com.example.cuoponProject.Login.UserDetails;
import com.example.cuoponProject.Utils.JWTUtil;
import com.example.cuoponProject.entities.Company;
import com.example.cuoponProject.entities.Customer;
import com.example.cuoponProject.enums.UserType;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Data
public class LoginFacade {
    private final JWTUtil myUtil;
    private final AdminFacade adminFacade;

    public ResponseEntity<?> login(UserDetails userDetails) throws LoginException {
        boolean isExist = false;
        switch (userDetails.getUserType()) {
            case ADMINISTRATOR:
                isExist = userDetails.getPassword().equals("admin") && userDetails.getEmail().
                        equals("admin@admin") && userDetails.getUserType().equals(UserType.ADMINISTRATOR);
                break;
            case COMPANY:
                List<Company> companies = adminFacade.getAllCompaniesForLogIn().stream().
                        filter(company -> company.getEmail().equals(userDetails.getEmail())).
                        filter(company -> company.getPassword().equals(userDetails.getPassword())).
                        collect(Collectors.toList());
                if (companies.size() == 1) {
                    isExist = true;
                }
                break;
            case CUSTOMER:
                List<Customer> customers = adminFacade.getAllCustomersForLogIn().stream().
                        filter(customer -> customer.getEmail().equals(userDetails.getEmail())).
                        filter(customer -> customer.getPassword().equals(userDetails.getPassword())).
                        collect(Collectors.toList());
                if (customers.size() == 1) {
                    isExist = true;
                }
                break;
        }
        if (isExist) {
            return new ResponseEntity<>(myUtil.generateToken(userDetails), HttpStatus.ACCEPTED);
        } else {
            throw new LoginException("user details not valid");
        }
    }
}
