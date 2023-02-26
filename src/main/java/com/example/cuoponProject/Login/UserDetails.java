package com.example.cuoponProject.Login;

import com.example.cuoponProject.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDetails {
    private String password;
    private String email;
    private UserType userType;
}
