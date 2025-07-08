package com.example.demo.models;

import java.time.LocalDateTime;

public class oglasModel {
    private Long id;
    private String nazivPozicije;
    private String opisPosla;
    private String radnoIskustvo;
    private String kvalifikacije;
    private String lokacija;
    private LocalDateTime datumObjave;
    private LocalDateTime datumIsteka;
    private String regruterEmail;
    private Integer sektor_id;

    public oglasModel() {}

    public oglasModel(Long id, String nazivPozicije, String opisPosla, String radnoIskustvo,
                      String kvalifikacije, String lokacija, LocalDateTime datumObjave,
                      LocalDateTime datumIsteka, String regruterEmail, Integer sektor_id) {
        this.id = id;
        this.nazivPozicije = nazivPozicije;
        this.opisPosla = opisPosla;
        this.radnoIskustvo = radnoIskustvo;
        this.kvalifikacije = kvalifikacije;
        this.lokacija = lokacija;
        this.datumObjave = datumObjave;
        this.datumIsteka = datumIsteka;
        this.regruterEmail = regruterEmail;
        this.sektor_id = sektor_id;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getNazivPozicije() {return nazivPozicije;}
    public void setNazivPozicije(String nazivPozicije) {this.nazivPozicije = nazivPozicije;}

    public String getOpisPosla() {return opisPosla;}
    public void setOpisPosla(String opisPosla) {this.opisPosla = opisPosla;}

    public String getRadnoIskustvo() {return radnoIskustvo;}
    public void setRadnoIskustvo(String radnoIskustvo) {this.radnoIskustvo = radnoIskustvo;}

    public String getKvalifikacije() {return kvalifikacije;}
    public void setKvalifikacije(String kvalifikacije) {this.kvalifikacije = kvalifikacije;}

    public String getLokacija() {return lokacija;}
    public void setLokacija(String lokacija) {this.lokacija = lokacija;}

    public LocalDateTime getDatumObjave() {return datumObjave;}
    public void setDatumObjave(LocalDateTime datumObjave) {this.datumObjave = datumObjave;}

    public LocalDateTime getDatumIsteka() {return datumIsteka;}
    public void setDatumIsteka(LocalDateTime datumIsteka) {this.datumIsteka = datumIsteka;}

    public String getRegruterEmail() {return regruterEmail;}
    public void setRegruterEmail(String regruterEmail) {this.regruterEmail = regruterEmail;}

    public Integer getSektor_id() {return sektor_id;}
    public void setSektor_id(Integer sektor_id) {this.sektor_id = sektor_id;}
}