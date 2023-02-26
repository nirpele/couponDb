package com.example.cuoponProject.Controller;

import com.example.cuoponProject.Exceptions.LoginException;
import com.example.cuoponProject.Login.UserDetails;
import com.example.cuoponProject.services.LoginFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequiredArgsConstructor
@RequestMapping("login")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class LoginController {

    private final LoginFacade loginFacade;

    @PostMapping()
    public ResponseEntity<?> getLoginToken(@RequestBody UserDetails userDetails) throws LoginException {
        return loginFacade.login(userDetails);
    }
}
