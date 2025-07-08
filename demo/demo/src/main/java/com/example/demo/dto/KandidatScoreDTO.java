package com.example.demo.dto;

import com.example.demo.models.kandidatiModel;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class KandidatScoreDTO {
    @JsonIgnore
    private kandidatiModel kandidat;
    private int score;
    private Long kandidatId;
    private String ime;
    private String email;

    public KandidatScoreDTO() {
    }

    public KandidatScoreDTO(Long kandidatId, String ime, String email, int score) {
        this.kandidatId = kandidatId;
        this.ime = ime;
        this.email = email;
        this.score = score;
    }
    public KandidatScoreDTO(kandidatiModel kandidat, int score) {
        this.kandidat = kandidat;
        this.score = score;
    }

    // Getteri i setteri
    public kandidatiModel getKandidat() {
        return kandidat;
    }
    public void setKandidat(kandidatiModel kandidat) {
        this.kandidat = kandidat;
    }
    public int getScore() {
        return score;
    }
    public void setScore(int score) {
        this.score = score;
    }
    public Long getKandidatId() { return kandidatId; }
    public void setKandidatId(Long kandidatId) { this.kandidatId = kandidatId; }
    public String getIme() { return ime; }
    public void setIme(String ime) { this.ime = ime; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}

