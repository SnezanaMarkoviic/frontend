package com.example.demo.dto;

import java.time.LocalDateTime;

public class IntervjuDTO {
        public int prijavaId;
        public int regruterId;
        public LocalDateTime datum;
        public String komentari;
        public String tipIntervjua;
        public String lokacija;
        public String linkIntervjua;

    public int getPrijavaId() {
        return prijavaId;
    }

    public void setPrijavaId(int prijavaId) {
        this.prijavaId = prijavaId;
    }

    public int getRegruterId() {
        return regruterId;
    }

    public void setRegruterId(int regruterId) {
        this.regruterId = regruterId;
    }

    public LocalDateTime getDatum() {
        return datum;
    }

    public void setDatum(LocalDateTime datum) {
        this.datum = datum;
    }

    public String getKomentari() {
        return komentari;
    }

    public void setKomentari(String komentari) {
        this.komentari = komentari;
    }
}

