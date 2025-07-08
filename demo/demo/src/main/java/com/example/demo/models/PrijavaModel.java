package com.example.demo.models;
import java.time.LocalDateTime;

public class PrijavaModel {
    private Long id;
    private Long oglasId;
    private Long kandidatId;
    private String status;
    private LocalDateTime datumPrijave;
    private String kandidatEmail;
    private String nazivPozicije;


    // Konstruktori
    public PrijavaModel() {}

    public PrijavaModel(Long id, Long oglasId, Long kandidatId, String status, LocalDateTime datumPrijave) {
        this.id = id;
        this.oglasId = oglasId;
        this.kandidatId = kandidatId;
        this.status = status;
        this.datumPrijave = datumPrijave;
    }

    // Getteri i setteri

    public String getKandidatEmail() {return kandidatEmail;}
    public void setKandidatEmail(String kandidatEmail) {this.kandidatEmail = kandidatEmail;}

    public String getNazivPozicije() {return nazivPozicije;}
    public void setNazivPozicije(String nazivPozicije) {this.nazivPozicije = nazivPozicije;}

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public Long getOglasId() {return oglasId;}
    public void setOglasId(Long oglasId) {this.oglasId = oglasId;}

    public Long getKandidatId() {return kandidatId;}
    public void setKandidatId(Long kandidatId) {this.kandidatId = kandidatId;}

    public String getStatus() {return status;}
    public void setStatus(String status) {this.status = status;}

    public LocalDateTime getDatumPrijave() {return datumPrijave;}
    public void setDatumPrijave(LocalDateTime datumPrijave) {this.datumPrijave = datumPrijave;}
}

