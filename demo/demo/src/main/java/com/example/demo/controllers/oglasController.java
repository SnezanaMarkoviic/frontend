package com.example.demo.controllers;
import com.example.demo.dto.KandidatScoreDTO;
import com.example.demo.models.kandidatiModel;
import com.example.demo.models.oglasModel;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.repositories.oglasRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.services.kandidatiServices;
import com.example.demo.repositories.kandidatiRepository;
import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/api/oglasi")
public class oglasController {

    @Autowired
    private oglasRepository oglasRepo;

    @PostMapping("/dodaj")
    public ResponseEntity<String> dodajOglas(@RequestBody oglasModel oglas) {
        oglasRepo.sacuvajOglas(oglas);
        return ResponseEntity.ok("Oglas uspješno dodat.");
    }

    @GetMapping("/svi")
    public ResponseEntity<List<oglasModel>> sviOglasi() {
        return ResponseEntity.ok(oglasRepo.vratiSve());
    }

    @GetMapping("/filtriraj")
    public ResponseEntity<List<oglasModel>> filtrirajOglase(
            @RequestParam(required = false) String pozicija,
            @RequestParam(required = false) String lokacija,
            @RequestParam(required = false) String iskustvo,
            @RequestParam(required = false) Integer sektorId) {

        List<oglasModel> rezultat = oglasRepo.filtrirajOglase(pozicija, lokacija, iskustvo, sektorId);
        return ResponseEntity.ok(rezultat);
    }


    @GetMapping("/{id}")
    public ResponseEntity<oglasModel> jedan(@PathVariable Long id) {
        oglasModel oglas = oglasRepo.nadjiPoId(id);
        return oglas != null ? ResponseEntity.ok(oglas) : ResponseEntity.notFound().build();
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<String> izmeni(@PathVariable Long id, @RequestBody oglasModel oglas) {
        oglasRepo.izmeniOglas(id, oglas);
        return ResponseEntity.ok("Oglas izmijenjen.");
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> obrisi(@PathVariable Long id) {
        oglasRepo.obrisiOglas(id);
        return ResponseEntity.ok("Oglas obrisan.");
    }

    @Autowired
    private kandidatiRepository kandidatiRepository;

    @Autowired
    private kandidatiServices kandidatService;

    @GetMapping("/{oglasId}/kandidati")
    public List<KandidatScoreDTO> getKandidatiSaScore(@PathVariable int oglasId) {
        // Uzmi sve kandidate koji su se prijavili za dati oglas (ovde ti treba metoda da vrati kandidate po oglasId)
        List<kandidatiModel> kandidatiZaOglas = kandidatiRepository.getKandidatiByOglasId(oglasId);

        List<KandidatScoreDTO> result = new ArrayList<>();

        for (kandidatiModel kandidat : kandidatiZaOglas) {
            int score = kandidatService.izracunajScoreZaKandidata(kandidat, oglasId);
            result.add(new KandidatScoreDTO(kandidat, score));
        }

        return result;
    }
}

