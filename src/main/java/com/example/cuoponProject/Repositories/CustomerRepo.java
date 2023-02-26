package com.example.cuoponProject.Repositories;

import com.example.cuoponProject.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer> {

    Customer findCustomerById(int id);

}
