package com.example.cuoponProject;

import com.example.cuoponProject.Utils.Art;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Date;

//tasks for finishing the project
//first check all the method in facades in tester
//second build auto thread that delete coupons

@SpringBootApplication
public class CuoponProjectApplication {

    public static void main(String[] args) {

        System.out.println(new Date(System.currentTimeMillis()));
        SpringApplication.run(CuoponProjectApplication.class, args);
        System.out.println(Art.localhost);
    }
}
