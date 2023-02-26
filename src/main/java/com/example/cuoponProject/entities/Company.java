package com.example.cuoponProject.entities;

import lombok.*;
import org.springframework.context.annotation.Scope;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Scope("prototype")
@Table(name = "Company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    //uniqe
    private String name;
    //uniqe
    private String email;
    private String password;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    List<Coupon> coupons=new ArrayList<>();
}
