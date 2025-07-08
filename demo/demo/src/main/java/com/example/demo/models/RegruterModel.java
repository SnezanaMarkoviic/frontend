package com.example.demo.models;

public class RegruterModel {
    private long id;
    private String ime;
    private String prezime;
    private String email;
    private String lozinka;
    private String username;

    public String getIme() {return ime;}
    public void setIme(String ime) {this.ime = ime;}

    public String getPrezime() {return prezime;}
    public void setPrezime(String prezime) {this.prezime = prezime;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getLozinka() {return lozinka;}
    public void setLozinka(String lozinka) {this.lozinka = lozinka;}

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public RegruterModel() {}

    public RegruterModel(String ime, String prezime, String email, String lozinka, String username) {
        this.ime=ime;
        this.prezime=prezime;
        this.email=email;
        this.lozinka=lozinka;
        this.username=username;
    }

    public RegruterModel(long id, String ime, String prezime, String email, String lozinka, String username) {
        this.id=id;
        this.ime=ime;
        this.prezime=prezime;
        this.email=email;
        this.lozinka=lozinka;
        this.username=username;
    }
}
