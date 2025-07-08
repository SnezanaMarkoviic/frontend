package com.example.demo.controllers;

import com.example.demo.dto.StatusUpdateRequest;
import com.example.demo.models.PrijavaModel;
import com.example.demo.models.UserModel;
import com.example.demo.services.EmailService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.repositories.PrijavaRepository;
import com.example.demo.repositories.UserRepository;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/prijave")
public class PrijavaController {

    @Autowired
    private PrijavaRepository repo;

    @Autowired
    private PrijavaRepository prijavaRepository;

    @Autowired
    private UserRepository userRepository;

    private final EmailService es;

    public PrijavaController(EmailService es) {
        this.es = es;
    }

    @PostMapping("/dodaj")
    public ResponseEntity<String> prijaviSe(@RequestBody PrijavaModel prijava) {
        int rows = repo.prijaviSeNaOglas(prijava.getOglasId(), prijava.getKandidatId());
        if (rows > 0) return ResponseEntity.ok("Uspješna prijava.");
        else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Greška pri prijavi.");
    }

    @GetMapping("/kandidat/{kandidatId}")
    public List<PrijavaModel> prijaveKandidata(@PathVariable Long kandidatId) {
        return repo.getPrijaveZaKandidata(kandidatId);
    }

    @GetMapping("/oglas/{oglasId}")
    public List<PrijavaModel> prijaveZaOglas(@PathVariable Long oglasId) {
        return repo.getPrijaveZaOglas(oglasId);
    }

    @PatchMapping("/{prijavaId}/status")
    public ResponseEntity<?> azurirajStatus(@PathVariable Long prijavaId,
                                            @RequestBody StatusUpdateRequest request,
                                            HttpSession session) {

        UserModel user = (UserModel) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Morate biti ulogovani.");
        }

        if (!"REGRUTER".equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Samo regruter može da mijenja status.");
        }

        String status = request.getStatus();
        List<String> dozvoljeniStatusi = Arrays.asList("U razmatranju", "Odbijen", "Prihvaćen");

        if (!dozvoljeniStatusi.contains(status)) {
            return ResponseEntity.badRequest().body("Neispravan status.");
        }

        int rezultat = prijavaRepository.azurirajStatus(prijavaId, status);
        if (rezultat <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Prijava nije pronađena.");
        }

        PrijavaModel prijava = prijavaRepository.getPrijavaById(prijavaId);
        if (prijava == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Greška pri dohvaćanju prijave.");
        }

        String kandidatEmail = prijava.getKandidatEmail();
        String nazivPozicije = prijava.getNazivPozicije();
        String imeRegrutera = user.getName();

        es.posaljiStatusPrijaveMail(kandidatEmail, imeRegrutera, nazivPozicije, status);

        return ResponseEntity.ok("Status ažuriran i poslata notifikacija kandidatu.");
    }

    @GetMapping("/moje")
    public ResponseEntity<?> mojePrijave(HttpSession session) {
        UserModel user = (UserModel) session.getAttribute("user");

        if (user == null || !"KANDIDAT".equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Pristup odbijen.");
        }

        List<PrijavaModel> prijave = repo.getPrijaveZaKandidata(user.getKandidatId());
        return ResponseEntity.ok(prijave);
    }
}
