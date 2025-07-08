package com.example.demo.repositories;

import com.example.demo.DBszr;
import com.example.demo.models.PrijavaModel;
import com.example.demo.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.dao.DuplicateKeyException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;

@Repository
public class PrijavaRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public int prijaviSeNaOglas(Long oglasId, Long kandidatId) {
        String sql = "INSERT INTO prijave (oglas_id, kandidat_id) VALUES (?, ?)";
        try {
            return jdbc.update(sql, oglasId, kandidatId);
        } catch (DuplicateKeyException e) {
            return -1; // već postoji prijava
        }
    }

    public List<PrijavaModel> getPrijaveZaKandidata(Long kandidatId) {
        String sql = "SELECT * FROM prijave WHERE kandidat_id = ?";
        return jdbc.query(sql, new BeanPropertyRowMapper<>(PrijavaModel.class), kandidatId);
    }

    public List<PrijavaModel> getPrijaveZaOglas(Long oglasId) {
        String sql = "SELECT * FROM prijave WHERE oglas_id = ?";
        return jdbc.query(sql, new BeanPropertyRowMapper<>(PrijavaModel.class), oglasId);
    }

    public int azurirajStatus(Long prijavaId, String noviStatus) {
        String sql = "UPDATE prijave SET status_prijave = ? WHERE id = ?";
        return jdbc.update(sql, noviStatus, prijavaId);
    }

    public PrijavaModel getPrijavaById(Long prijavaId) {
        String sql = """
        SELECT
              p.id,
              k.email AS kandidat_email,
              o.naziv_pozicije AS naziv_pozicije
              FROM prijave p
              JOIN kandidati k ON p.kandidat_id = k.id
              JOIN oglasi o ON p.oglas_id = o.id
              WHERE p.id = ?
    """;
        return jdbc.queryForObject(sql, new BeanPropertyRowMapper<>(PrijavaModel.class), prijavaId);
    }

}

