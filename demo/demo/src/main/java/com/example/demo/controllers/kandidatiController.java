package com.example.demo.controllers;

import com.example.demo.dto.KandidatScoreDTO;
import com.example.demo.models.kandidatiModel;
import com.example.demo.repositories.kandidatiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.services.kandidatiServices;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/kandidati")
public class kandidatiController {

        private final kandidatiRepository kandidatRepo;
        private final kandidatiServices kandidatiServices;
        public kandidatiController(kandidatiRepository kandidatRepo,kandidatiServices kandidatiServices) {
            this.kandidatRepo = kandidatRepo;
            this.kandidatiServices = kandidatiServices;
        }

    // GET - Prikaz svih kandidata
    @GetMapping
    public List<kandidatiModel> getAllKandidati() {
        return kandidatRepo.getAllKandidati();
    }

    // GET - Prikaz jednog kandidata po ID
    @GetMapping("/{id}")
    public kandidatiModel getKandidatByID(@PathVariable long id) {
        return kandidatRepo.getKandidatByID(id);
    }

    // POST - Dodavanje novog kandidata
    @PostMapping
    public String insertKandidat(@RequestBody kandidatiModel kandidat) {
        int rezultat = kandidatRepo.insertKandidat(kandidat);
        return (rezultat > 0) ? "Kandidat usjpesno dodat!" : "Greska pri unosu!";
    }
    @DeleteMapping("/{id}")
    public String deleteKandidat(@PathVariable long id) {
        int rezultat = kandidatRepo.deleteKandidat((int) id);
        return (rezultat > 0) ? "Kandidat uspjesno obrisan!" : "Greska pri brisanju!";
    }
    // PUT - Azuriranje podataka o kandidatu
    @PutMapping("/{id}")
    public String updateKandidat(@PathVariable long id, @RequestBody kandidatiModel kandidat) {
        // Postavljanje ID-a u kandidat objekat pre nego što ga pošaljemo u repository
        kandidat.setId(id);

        int rezultat = kandidatRepo.updateKandidat(kandidat);
        return (rezultat > 0) ? "Kandidat uspešno azuriran!" : "Greska pri azuriranju kandidata!";
    }


    @PutMapping("/dopuni-profil")
    public ResponseEntity<?> dopuniProfil(@RequestBody kandidatiModel dopuna) {
        try {
            // Pronađi kandidata po email-u
            String email = dopuna.getEmail();
            kandidatiModel kandidat = kandidatRepo.findByEmail(email);

            if (kandidat == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kandidat nije pronađen.");
            }

            // Ažuriraj podatke samo ako su prosleđeni
            if (dopuna.getObrazovanje() != null) kandidat.setObrazovanje(dopuna.getObrazovanje());
            if (dopuna.getSertifikati() != null) kandidat.setSertifikati(dopuna.getSertifikati());
            if (dopuna.getJezici() != null) kandidat.setJezici(dopuna.getJezici());
            if (dopuna.getRadnoIskustvoGodine() != null) kandidat.setRadnoIskustvoGodine(dopuna.getRadnoIskustvoGodine());

            // Sačuvaj izmene
            kandidatRepo.updateKandidatCV(kandidat);

            return ResponseEntity.ok("Profil je uspješno dopunjen.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Greška: " + e.getMessage());
        }
    }

    @PostMapping("/rangiraj")
    public ResponseEntity<?> rangirajKandidate(@RequestBody Map<String, Integer> body) {
        int oglasId = body.get("oglasId");
        List<KandidatScoreDTO> rangirani = kandidatiServices.rangirajKandidate(oglasId);
        return ResponseEntity.ok(rangirani);
    }


}
