package com.example.demo.repositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import java.sql.Statement;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.models.UserModel;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;

@Repository


public class RegruterRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int insertBasicRegruterInfo(UserModel user) {
        String sql = "INSERT INTO regruteri (ime, prezime, email, username, lozinka) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getName());
            ps.setString(2, user.getLast_name());
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getUsername());
            ps.setString(5, user.getPassword());
            return ps;
        }, keyHolder);

        return keyHolder.getKey().intValue(); // Vraca ID regrutera
    }
}
