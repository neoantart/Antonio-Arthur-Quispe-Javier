package com.tecnova.repository;

import java.util.List;

import com.tecnova.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByFirstName(String firstName);

  List<User> findByLastNameContainingIgnoreCase(String lastName);
}
