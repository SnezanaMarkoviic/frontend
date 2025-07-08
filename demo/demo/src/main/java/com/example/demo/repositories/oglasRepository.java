package com.example.demo.repositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.demo.models.oglasModel;
import javax.sql.DataSource;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class oglasRepository {

    private final DataSource dataSource;
    @Autowired
    public oglasRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // CREATE
    public void sacuvajOglas(oglasModel oglas) {
        String sql = "INSERT INTO oglasi (naziv_pozicije, opis_posla, radno_iskustvo, kvalifikacije, lokacija, datum_objave, datum_isteka, regruter_email, sektor_id) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, oglas.getNazivPozicije());
            stmt.setString(2, oglas.getOpisPosla());
            stmt.setString(3, oglas.getRadnoIskustvo());
            stmt.setString(4, oglas.getKvalifikacije());
            stmt.setString(5, oglas.getLokacija());
            stmt.setTimestamp(6, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setTimestamp(7, Timestamp.valueOf(oglas.getDatumIsteka()));
            stmt.setString(8, oglas.getRegruterEmail());
            if (oglas.getSektor_id() != null) {
                stmt.setInt(9, oglas.getSektor_id());
            } else {
                stmt.setNull(9, Types.INTEGER);
            }

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // READ ALL
    public List<oglasModel> vratiSve() {
        List<oglasModel> oglasi = new ArrayList<>();
        String sql = "SELECT * FROM oglasi";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                oglasi.add(mapResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return oglasi;
    }

    // READ BY ID
    public oglasModel nadjiPoId(Long id) {
        String sql = "SELECT * FROM oglasi WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) return mapResultSet(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // UPDATE
    public void izmeniOglas(Long id, oglasModel oglas) {
        String sql = "UPDATE oglasi SET naziv_pozicije=?, opis_posla=?, radno_iskustvo=?, kvalifikacije=?, lokacija=?, datum_isteka=?, sektor_id=? WHERE id=?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, oglas.getNazivPozicije());
            stmt.setString(2, oglas.getOpisPosla());
            stmt.setString(3, oglas.getRadnoIskustvo());
            stmt.setString(4, oglas.getKvalifikacije());
            stmt.setString(5, oglas.getLokacija());
            stmt.setTimestamp(6, Timestamp.valueOf(oglas.getDatumIsteka()));

            if (oglas.getSektor_id() != null) {
                stmt.setInt(7, oglas.getSektor_id());
            } else {
                stmt.setNull(7, Types.INTEGER);
            }

            stmt.setLong(8, id);

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // DELETE
    public void obrisiOglas(Long id) {
        String sql = "DELETE FROM oglasi WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Helper metoda
    private oglasModel mapResultSet(ResultSet rs) throws SQLException {
        oglasModel o = new oglasModel();
        o.setId(rs.getLong("id"));
        o.setNazivPozicije(rs.getString("naziv_pozicije"));
        o.setOpisPosla(rs.getString("opis_posla"));
        o.setRadnoIskustvo(rs.getString("radno_iskustvo"));
        o.setKvalifikacije(rs.getString("kvalifikacije"));
        o.setLokacija(rs.getString("lokacija"));
        o.setDatumObjave(rs.getTimestamp("datum_objave").toLocalDateTime());
        o.setDatumIsteka(rs.getTimestamp("datum_isteka").toLocalDateTime());
        o.setRegruterEmail(rs.getString("regruter_email"));
        int sektorId = rs.getInt("sektor_id");
        if (!rs.wasNull()) {
            o.setSektor_id(sektorId);
        } else {
            o.setSektor_id(null);
        }
        return o;
    }

    public List<oglasModel> filtrirajOglase(String pozicija, String lokacija, String iskustvo, Integer sektorId) {
        List<oglasModel> rezultati = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT * FROM oglasi WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (pozicija != null && !pozicija.isEmpty()) {
            sql.append(" AND LOWER(naziv_pozicije) LIKE ?");
            params.add("%" + pozicija.toLowerCase() + "%");
        }

        if (lokacija != null && !lokacija.isEmpty()) {
            sql.append(" AND LOWER(lokacija) LIKE ?");
            params.add("%" + lokacija.toLowerCase() + "%");
        }

        if (iskustvo != null && !iskustvo.isEmpty()) {
            sql.append(" AND LOWER(radno_iskustvo) LIKE ?");
            params.add("%" + iskustvo.toLowerCase() + "%");
        }

        if (sektorId != null) {
            sql.append(" AND sektor_id = ?");
            params.add(sektorId);
        }

        sql.append(" ORDER BY datum_objave DESC");

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql.toString())) {

            for (int i = 0; i < params.size(); i++) {
                stmt.setObject(i + 1, params.get(i));
            }

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                rezultati.add(mapResultSet(rs));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rezultati;
    }

}

