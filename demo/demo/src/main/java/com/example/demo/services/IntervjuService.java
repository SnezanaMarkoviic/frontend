package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class IntervjuService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private JdbcTemplate jdbc;

    public boolean zakaziIntervju(int prijavaId, int regruterId, LocalDateTime datum, String komentari, String tipIntervjua, String lokacija, String linkIntervjua) {
        try {
            String sql = "INSERT INTO intervjui (prijava_id, regruter_id, datum_intervjua, komentari, tip_intervjua, lokacija, link_intervjua) VALUES (?, ?, ?, ?, ?, ?, ?)";
            jdbc.update(sql, prijavaId, regruterId, Timestamp.valueOf(datum), komentari, tipIntervjua, lokacija, linkIntervjua);

            // Pribavi podatke kandidata
            String query = """
                        SELECT k.email, k.ime, k.id AS kandidat_id, o.naziv_pozicije 
                        FROM kandidati k
                        JOIN prijave p ON k.id = p.kandidat_id
                        JOIN oglasi o ON o.id = p.oglas_id
                        WHERE p.id = ?
                    """;
            Map<String, Object> result = jdbc.queryForMap(query, prijavaId);
            String email = (String) result.get("email");
            String ime = (String) result.get("ime");
            String pozicija = (String) result.get("naziv_pozicije");
            int kandidatId = (int) result.get("kandidat_id");

            // Formatiranje datuma i vremena u Europe/Lisbon zonu i željeni format
            ZonedDateTime zonedDatum = datum.atZone(ZoneId.systemDefault())
                    .withZoneSameInstant(ZoneId.of("Europe/Lisbon"));
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
            String formattedDateTime = zonedDatum.format(formatter);

            // Sastavljanje poruke u zavisnosti od tipa intervjua
            String poruka;
            if ("uzivo".equalsIgnoreCase(tipIntervjua)) {
                poruka = "Intervju će biti održan uživo.\nLokacija: " + lokacija + "\nDatum i vrijeme: " + formattedDateTime;
            } else {
                poruka = "Intervju će biti održan online.\nDatum i vrijeme: " + formattedDateTime + "\nLink za pristup: " + linkIntervjua;
            }

            String subject = "Poziv na intervju - " + pozicija;
            String body = "Poštovani/a " + ime + ",\n\n" +
                    "Pozvani ste na intervju za poziciju: " + pozicija + ".\n" +
                    poruka + "\n\n" +
                    "Srećno,\nVaš HR tim.";

            emailService.sendEmail(email, subject, body);

            // Kreiranje obaveštenja u bazi
            String obavestenje = "Pozvani ste na intervju za poziciju: " + pozicija + ". Datum i vrijeme: " + formattedDateTime;
            jdbc.update("INSERT INTO obavestenja (kandidat_id, sadrzaj) VALUES (?, ?)", kandidatId, obavestenje);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

