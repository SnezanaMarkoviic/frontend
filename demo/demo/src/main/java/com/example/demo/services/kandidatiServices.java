package com.example.demo.services;

import com.example.demo.DBszr;
import com.example.demo.dto.KandidatScoreDTO;
import com.example.demo.models.kandidatiModel;
import com.example.demo.repositories.kandidatiRepository;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class kandidatiServices {

    private final kandidatiRepository kandidatiRepository;

    public kandidatiServices(kandidatiRepository kandidatiRepository) {
        this.kandidatiRepository = kandidatiRepository;
    }

    public List<kandidatiModel> getAllKandidati() {
        return kandidatiRepository.getAllKandidati();
    }

    public kandidatiModel getKandidatByID(int kandidatID) {
        return kandidatiRepository.getKandidatByID(kandidatID);
    }

    public int insertKandidat(kandidatiModel kandidat) {
        return kandidatiRepository.insertKandidat(kandidat);
    }

   /* public int updateKandidat(kandidatiRepository kandidat) {
        return kandidatiRepository.updateKandidat(kandidat);
    }*/

    public int deleteKandidat(int kandidatID) {
        return kandidatiRepository.deleteKandidat(kandidatID);
    }

    public int izracunajScoreZaKandidata(kandidatiModel kandidat, int oglasId) {
        int score = 0;

        try (Connection conn = DBszr.open()) {
            String sql = "SELECT tip, vrijednost, obavezno FROM zahtjevi_oglasa WHERE oglas_id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, oglasId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                String tip = rs.getString("tip");
                String vrednost = rs.getString("vrijednost").toLowerCase();
                boolean obavezno = rs.getBoolean("obavezno");

                boolean isMatch = false;

                switch (tip) {
                    case "OBRAZOVANJE":
                        isMatch = kandidat.getObrazovanje() != null &&
                                kandidat.getObrazovanje().toLowerCase().contains(vrednost);
                        if (isMatch) score += 20;
                        break;
                    case "SERTIFIKAT":
                        isMatch = kandidat.getSertifikati() != null &&
                                kandidat.getSertifikati().toLowerCase().contains(vrednost);
                        if (isMatch) score += 15;
                        break;
                    case "JEZIK":
                        isMatch = kandidat.getJezici() != null &&
                                kandidat.getJezici().toLowerCase().contains(vrednost);
                        if (isMatch) score += 10;
                        break;
                }

                if (obavezno && !isMatch) return 0;
            }

            int iskustvo = kandidat.getRadnoIskustvoGodine() != null ? kandidat.getRadnoIskustvoGodine() : 0;
            score += Math.min(iskustvo * 2, 20);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return score;
    }

    public List<KandidatScoreDTO> rangirajKandidate(int oglasId) {
        List<kandidatiModel> kandidati = kandidatiRepository.getKandidatiByOglasId(oglasId);
        List<KandidatScoreDTO> rezultat = new ArrayList<>();

        for (kandidatiModel kandidat : kandidati) {
            int score = izracunajScoreZaKandidata(kandidat, oglasId);
            KandidatScoreDTO dto = new KandidatScoreDTO(
                    kandidat.getId(), kandidat.getIme(), kandidat.getEmail(), score);
            rezultat.add(dto);
        }

        // Sortiraj po score opadajuće
        rezultat.sort((a, b) -> Integer.compare(b.getScore(), a.getScore()));

        return rezultat;
    }


}
