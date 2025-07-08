package com.example.demo.repositories;

import com.example.demo.DBszr;
import com.example.demo.models.kandidatiModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.demo.models.UserModel;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.GeneratedKeyHolder;


@Repository
public class kandidatiRepository implements kandidatiInterfejs {

    private static final String GET_ALL_KANDIDATI = "SELECT * FROM kandidati";
    private static final String GET_KANDIDAT_BY_ID = "SELECT * FROM kandidati WHERE id = ?";
    private static final String INSERT_KANDIDAT = "INSERT INTO kandidati(ime, prezime, email, telefon, radno_iskustvo_godine, obrazovanje, sertifikati, jezici, status_prijave) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

    @Override
    public List<kandidatiModel> getAllKandidati() {
        try (Connection conn = DBszr.open();
             PreparedStatement ps = conn.prepareStatement(GET_ALL_KANDIDATI);
             ResultSet rs = ps.executeQuery()) {
            List<kandidatiModel> result = new ArrayList<>();
            while (rs.next()) {
                result.add(new kandidatiModel(
                        rs.getLong("id"),
                        rs.getString("ime"),
                        rs.getString("prezime"),
                        rs.getString("email"),
                        rs.getString("telefon"),
                        rs.getInt("radno_iskustvo_godine"),
                        rs.getString("obrazovanje"),
                        rs.getString("sertifikati"),
                        rs.getString("jezici"),
                        rs.getString("status_prijave"),
                        rs.getTimestamp("datum_registracije").toLocalDateTime()));
            }
            return result;
        } catch (Exception ex) {
            throw new RuntimeException("Error getting all candidates", ex);
        }
    }

    @Override
    public kandidatiModel getKandidatByID(int kandidatID) {
        return null;
    }

    public kandidatiModel getKandidatByID(long kandidatID) {
        try (Connection conn = DBszr.open();
             PreparedStatement ps = conn.prepareStatement(GET_KANDIDAT_BY_ID)) {
            ps.setLong(1, kandidatID);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new kandidatiModel(
                            rs.getLong("id"),
                            rs.getString("ime"),
                            rs.getString("prezime"),
                            rs.getString("email"),
                            rs.getString("telefon"),
                            rs.getInt("radno_iskustvo_godine"),
                            rs.getString("obrazovanje"),
                            rs.getString("sertifikati"),
                            rs.getString("jezici"),
                            rs.getString("status_prijave"),
                            rs.getTimestamp("datum_registracije").toLocalDateTime());
                } else {
                    throw new RuntimeException("Candidate not found");
                }
            }
        } catch (Exception ex) {
            throw new RuntimeException("Error getting candidate by ID", ex);
        }
    }

    @Override
    public int insertKandidat(kandidatiModel kandidat) {
        try (Connection conn = DBszr.open();
             PreparedStatement ps = conn.prepareStatement(INSERT_KANDIDAT)) {
            ps.setString(1, kandidat.getIme());
            ps.setString(2, kandidat.getPrezime());
            ps.setString(3, kandidat.getEmail());
            ps.setString(4, kandidat.getTelefon());
            ps.setInt(5, kandidat.getRadnoIskustvoGodine());
            ps.setString(6, kandidat.getObrazovanje());
            ps.setString(7, kandidat.getSertifikati());
            ps.setString(8, kandidat.getJezici());
            ps.setString(9, kandidat.getStatusPrijave());

            return ps.executeUpdate();
        } catch (Exception ex) {
            throw new RuntimeException("Error inserting candidate", ex);
        }
    }

    @Override
    public int updateKandidat(kandidatiModel kandidat) {
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try {
            conn = DBszr.open();

            // SQL upit za update
            String commandText = "UPDATE kandidati SET ime = ?, prezime = ?, email = ?, telefon = ?, " +
                    "radno_iskustvo_godine = ?, obrazovanje = ?, sertifikati = ?, jezici = ?, status_prijave = ? " +
                    "WHERE id = ?";

            // Kreiranje preparedStatement-a
            ps = conn.prepareStatement(commandText);

            // Postavljanje vrednosti iz objekta kandidata
            ps.setString(1, kandidat.getIme());
            ps.setString(2, kandidat.getPrezime());
            ps.setString(3, kandidat.getEmail());
            ps.setString(4, kandidat.getTelefon());
            ps.setInt(5, kandidat.getRadnoIskustvoGodine());
            ps.setString(6, kandidat.getObrazovanje());
            ps.setString(7, kandidat.getSertifikati());
            ps.setString(8, kandidat.getJezici());
            ps.setString(9, kandidat.getStatusPrijave());
            ps.setLong(10, kandidat.getId()); // ID kandidata


            int affectedRows = ps.executeUpdate();
            result = (affectedRows > 0) ? 1 : 0; // Ako je ažuriranje uspešno, vrati 1

            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println("Greska u updateKandidat: " + ex.getMessage());
            result = -1;
        } finally {
            try {
                if (ps != null) ps.close();
                if (conn != null) conn.close();
            } catch (Exception ex) {
                System.out.println(ex);
            }
        }

        return result;
    }

    public int deleteKandidat(int kandidatID) {
        Connection conn = null;
        PreparedStatement ps = null;
        int result = -1;

        try {
            conn = DBszr.open();
            String commandText = "DELETE FROM kandidati WHERE id = ?";
            ps = conn.prepareStatement(commandText);
            ps.setInt(1, kandidatID);

            int affectedRows = ps.executeUpdate();
            result = (affectedRows > 0) ? 1 : 0;

            ps.close();
            conn.close();
        } catch (Exception ex) {
            System.out.println("Greška u deleteKandidat: " + ex.getMessage());
            result = -1;
        } finally {
            try {
                if (ps != null) ps.close();
                if (conn != null) conn.close();
            } catch (Exception ex) {
                System.out.println(ex);
            }
        }

        return result;
    }

    public void insertBasicInfoFromUser(UserModel user) {
        String sql = "INSERT INTO kandidati (ime, prezime, username, email, password) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DBszr.open(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, user.getName());
            ps.setString(2, user.getLast_name());
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getUsername());
            ps.setString(5, user.getPassword());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int insertBasicCandidateInfo(UserModel user) {
        String sql = "INSERT INTO kandidati (ime, prezime, email, username, lozinka) VALUES (?, ?, ?, ?, ?)";
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

        return keyHolder.getKey().intValue(); // Vraca ID kandidata
    }



        private final DataSource dataSource;

        @Autowired
        public kandidatiRepository(DataSource dataSource) {
            this.dataSource = dataSource;
        }
        public Integer findKandidatIdByUsernameOrEmail(String username, String email) {
            String sql = "SELECT id FROM kandidati WHERE username = ? OR email = ?";
            try (Connection conn = DBszr.open();
                 PreparedStatement ps = conn.prepareStatement(sql)) {

                ps.setString(1, username);
                ps.setString(2, email);
                ResultSet rs = ps.executeQuery();

                if (rs.next()) {
                    return rs.getInt("id");
                } else {
                    return null;
                }

            } catch (Exception e) {
                throw new RuntimeException("Greška pri traženju kandidata", e);
            }
        }

        public kandidatiModel findByEmail(String email) {
            try (Connection conn = dataSource.getConnection()) {
                String sql = "SELECT * FROM kandidati WHERE email = ?";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setString(1, email);
                ResultSet rs = stmt.executeQuery();

                if (rs.next()) {
                    return new kandidatiModel(
                            rs.getLong("id"),
                            rs.getString("ime"),
                            rs.getString("prezime"),
                            rs.getString("email"),
                            rs.getString("telefon"),
                            rs.getInt("radno_iskustvo_godine"),
                            rs.getString("obrazovanje"),
                            rs.getString("sertifikati"),
                            rs.getString("jezici"),
                            rs.getString("status_prijave"),
                            rs.getTimestamp("datum_registracije").toLocalDateTime()
                    );
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return null;
        }

        public void updateKandidatCV(kandidatiModel kandidat) {
            try (Connection conn = dataSource.getConnection()) {
                String sql = "UPDATE kandidati SET obrazovanje = ?, sertifikati = ?, jezici = ?, radno_iskustvo_godine = ? WHERE email = ?";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setString(1, kandidat.getObrazovanje());
                stmt.setString(2, kandidat.getSertifikati());
                stmt.setString(3, kandidat.getJezici());
                stmt.setInt(4, kandidat.getRadnoIskustvoGodine() != null ? kandidat.getRadnoIskustvoGodine() : 0);
                stmt.setString(5, kandidat.getEmail());
                stmt.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }


    public List<kandidatiModel> getKandidatiByOglasId(int oglasId) {
        // Primer, zavisi od tvoje strukture baze i tabela prijava
        String sql = "SELECT k.* FROM kandidati k JOIN prijave p ON k.id = p.kandidat_id WHERE p.oglas_id = ?";
        List<kandidatiModel> kandidati = new ArrayList<>();
        try (Connection conn = DBszr.open();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, oglasId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                kandidati.add(new kandidatiModel(
                        rs.getLong("id"),
                        rs.getString("ime"),
                        rs.getString("prezime"),
                        rs.getString("email"),
                        rs.getString("telefon"),
                        rs.getInt("radno_iskustvo_godine"),
                        rs.getString("obrazovanje"),
                        rs.getString("sertifikati"),
                        rs.getString("jezici"),
                        rs.getString("status_prijave"),
                        rs.getTimestamp("datum_registracije").toLocalDateTime()));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return kandidati;
    }

}
