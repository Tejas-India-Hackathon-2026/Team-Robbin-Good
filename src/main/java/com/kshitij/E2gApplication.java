package com.kshitij;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class E2gApplication {
    public static void main(String[] args) {
        SpringApplication.run(E2gApplication.class, args);
    }
}
