package com.example.demo.models;

public class UserModel {
    private Long id;
    private String name;
    private String last_name;
    private String username;
    private String email;
    private String password;
    private String role; // "KANDIDAT" ili "REGRUTER"
    private Long kandidatId;
    private Long regruterId;

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getLast_name() {return last_name;}

    public void setLast_name(String last_name) {this.last_name = last_name;}

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}

    public String getRole() {return role;}
    public void setRole(String role) {this.role = role;}

    public Long getKandidatId() {return kandidatId;}
    public void setKandidatId(Long kandidatId) {this.kandidatId = kandidatId;}


    public Long getRegruterId() {return regruterId;}
    public void setRegruterId(Long regruterId) {this.regruterId = regruterId;}


    // Konstruktor bez ID-a
    public UserModel(String username, String email, String password, String role, Long kandidatId, Long regruterId,String name,String lname) {
        this.name=name;
        this.last_name=lname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.kandidatId = kandidatId;
        this.regruterId = regruterId;

    }

    public UserModel() {}
}
