package com.example.cuoponProject.CLR;

import com.example.cuoponProject.services.AdminFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Order(1)
public class TesterAdmin implements CommandLineRunner {
    private final AdminFacade adminfacade;

    @Override
    public void run(String... args) throws Exception {

    }
}
