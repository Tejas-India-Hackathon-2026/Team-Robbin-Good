package com.kshitij.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    boolean existsByEmail(String email);

    long countByRole(Role role);

    List<User> findByRole(Role role);

    @Query("SELECT u.city FROM User u WHERE u.city IS NOT NULL GROUP BY u.city")
    List<String> findDistinctCities();
}
