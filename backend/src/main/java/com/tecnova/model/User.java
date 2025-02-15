package com.tecnova.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "users")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "firstName")
  private String firstName;

  @Column(name = "lastName")
  private String lastName;

  @Column(name = "rut")
  private Long rut;

  @Column(name = "dv")
  private String dv;

  @Column(name = "birthDate")
  private Date birthDate;

  @Column(name = "email")
  private String email;

  @Column(name = "password")
  private String password;

  /*public User() {

  }*/

/*  public User(String firstName, String lastName, Long rut, String dv, Date birthDate, String email, String password) {
    this.firstName=firstName;
    this.lastName=lastName;
    this.rut=rut;
    this.dv=dv;
    this.birthDate=birthDate;
    this.email=email;
    this.password=password;
  }*/

 /* @Override
  public String toString() {
    return "User [id=" + id + ", title=" + title + ", desc=" + description + ", published=" + published + "]";
  }*/

}
