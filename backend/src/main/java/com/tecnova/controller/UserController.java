package com.tecnova.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.tecnova.model.User;
import com.tecnova.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
@Slf4j
@Api(value = "UserManagement", description = "REST API for User Management", tags = { "User Management" })
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping("/users")
  @Operation(method = "GET", summary = "Get all users", description = "This method gets all users")
  @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "OK", content = {
          @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = User.class))) }) })
  public ResponseEntity<List<User>> getAllUsers() {
    try {

      List<User> users = new ArrayList<>(userRepository.findAll());

      if (users.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(users, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/users/{id}")
  @Operation(method = "GET", summary = "Get User", description = "This method get a user by ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "The User has been recovered successfully", content = {
                  @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)) }) })
  public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
    Optional<User> userData = userRepository.findById(id);

      if (userData.isPresent()) {
         return new ResponseEntity<>(userData.get(), HttpStatus.OK);
      } else {
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
  }

  @PostMapping("/createUser")
  @ApiOperation(httpMethod = "POST", value = "Create user", notes = "This method creates a new user")
  @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "User has been created successfully", content = {
          @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)) }) })
  public ResponseEntity<User> createUser(@RequestBody final User user) {
      try {
        log.info("New user `{}`", user);
        User _user = userRepository.save(user);
        return new ResponseEntity<>(_user, HttpStatus.CREATED);
      } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @PutMapping("/user/{id}")
  @Operation(method = "PUT", summary = "Update user", description = "This method updates a user by ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "The user has been updated successfully", content = {
                  @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)) }) })
  public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
    Optional<User> userData = userRepository.findById(id);

    if (userData.isPresent()) {
      User _user = userData.get();
      _user.setFirstName(user.getFirstName());
      _user.setLastName(user.getLastName());
      _user.setEmail(user.getEmail());
      _user.setDv(user.getDv());
      _user.setRut(user.getRut());
      return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/user/{id}")
  @Operation(method = "DELETE", summary = "Delete user", description = "Delete a user")
  @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "The user has been deleted successfully") })
  public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
    try {
      userRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/users")
  @Operation(method = "GET", summary = "Delete all users", description = "This method delete all users")
  @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "OK", content = {
          @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = User.class))) }) })
  public ResponseEntity<HttpStatus> deleteAllUsers() {
    try {
      userRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}
