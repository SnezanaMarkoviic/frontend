package com.example.demo.repositories;

import com.example.demo.DBszr;
import com.example.demo.models.UserModel;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Repository
public class UserRepository {

    public boolean existsByEmail(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        try (Connection conn = DBszr.open(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        } catch (Exception e) {
            throw new RuntimeException("Greška pri proveri email-a", e);
        }
        return false;
    }

    public boolean existsByUsername(String username) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
        try (Connection conn = DBszr.open(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        } catch (Exception e) {
            throw new RuntimeException("Greška pri proveri username-a", e);
        }
        return false;
    }



    public  int registerUser(UserModel user) {
        String sql = "INSERT INTO users (name, last_name, username, email, password, role, kandidat_id, regruter_id) VALUES (?, ?, ?, ?, ?, ?,?,?)";
        try (Connection conn = DBszr.open(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, user.getName());
            ps.setString(2, user.getLast_name());
            ps.setString(3, user.getUsername());
            ps.setString(4, user.getEmail());
            ps.setString(5, user.getPassword()); // U stvarnoj aplikaciji koristi heširanje!
            ps.setString(6, user.getRole());
            ps.setObject(7, user.getKandidatId());
            ps.setObject(8, user.getRegruterId());
            return ps.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException("Greška pri registraciji korisnika", e);
        }

    }


    public UserModel login(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        try (Connection conn = DBszr.open(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, username);
            ps.setString(2, password);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    UserModel user = new UserModel();
                    user.setId(rs.getLong("id"));
                    user.setName(rs.getString("name"));
                    user.setLast_name(rs.getString("last_name"));
                    user.setUsername(rs.getString("username"));
                    user.setEmail(rs.getString("email"));
                    user.setPassword(rs.getString("password"));
                    user.setRole(rs.getString("role"));
                    user.setKandidatId(rs.getObject("kandidat_id", Long.class));
                    user.setRegruterId(rs.getObject("regruter_id", Long.class));
                    return user;
                } else {
                    return null;
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Greška pri logovanju", e);
        }
    }

    public String getUserRoleById(Long userId) {
        String sql = "SELECT role FROM users WHERE id = ?";
        try (Connection conn = DBszr.open(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getString("role");
            }
        } catch (Exception e) {
            throw new RuntimeException("Greška pri dohvaćanju uloge korisnika", e);
        }
        return null;
    }


    @Autowired
    private JdbcTemplate jdbc;
    public String getImeRegruteraPoId(Long id) {
        String sql = "SELECT ime FROM users WHERE id = ?";
        return jdbc.queryForObject(sql, String.class, id);
    }

}


