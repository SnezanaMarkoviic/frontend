package com.example.demo.models;

import java.time.LocalDateTime;

public class kandidatiModel {

    private Long id;
    private String ime;
    private String prezime;
    private String email;
    private String telefon;
    private Integer radnoIskustvoGodine;
    private String obrazovanje;
    private String sertifikati;
    private String jezici;
    private String statusPrijave;
    private LocalDateTime datumRegistracije;

    public kandidatiModel() {
    }
    public kandidatiModel(String ime, String prezime, String email, String telefon, Integer radnoIskustvoGodine,
                    String obrazovanje, String sertifikati, String jezici, String statusPrijave) {
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.telefon = telefon;
        this.radnoIskustvoGodine = radnoIskustvoGodine;
        this.obrazovanje = obrazovanje;
        this.sertifikati = sertifikati;
        this.jezici = jezici;
        this.statusPrijave = statusPrijave;
        this.datumRegistracije = LocalDateTime.now(); // Automatski postavlja trenutni datum
    }

    // Konstruktor sa ID-om (za čitanje iz baze)
    public kandidatiModel(Long id, String ime, String prezime, String email, String telefon, Integer radnoIskustvoGodine,
                    String obrazovanje, String sertifikati, String jezici, String statusPrijave, LocalDateTime datumRegistracije) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.telefon = telefon;
        this.radnoIskustvoGodine = radnoIskustvoGodine;
        this.obrazovanje = obrazovanje;
        this.sertifikati = sertifikati;
        this.jezici = jezici;
        this.statusPrijave = statusPrijave;
        this.datumRegistracije = datumRegistracije;
    }

    // Getteri i setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getIme() { return ime; }
    public void setIme(String ime) { this.ime = ime; }

    public String getPrezime() { return prezime; }
    public void setPrezime(String prezime) { this.prezime = prezime; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefon() { return telefon; }
    public void setTelefon(String telefon) { this.telefon = telefon; }

    public Integer getRadnoIskustvoGodine() { return radnoIskustvoGodine; }
    public void setRadnoIskustvoGodine(Integer radnoIskustvoGodine) { this.radnoIskustvoGodine = radnoIskustvoGodine; }

    public String getObrazovanje() { return obrazovanje; }
    public void setObrazovanje(String obrazovanje) { this.obrazovanje = obrazovanje; }

    public String getSertifikati() { return sertifikati; }
    public void setSertifikati(String sertifikati) { this.sertifikati = sertifikati; }

    public String getJezici() { return jezici; }
    public void setJezici(String jezici) { this.jezici = jezici; }

    public String getStatusPrijave() { return statusPrijave; }
    public void setStatusPrijave(String statusPrijave) { this.statusPrijave = statusPrijave; }

    public LocalDateTime getDatumRegistracije() { return datumRegistracije; }
    public void setDatumRegistracije(LocalDateTime datumRegistracije) { this.datumRegistracije = datumRegistracije; }

}
