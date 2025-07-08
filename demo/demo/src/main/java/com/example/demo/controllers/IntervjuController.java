package com.example.demo.controllers;

import com.example.demo.dto.IntervjuDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.services.IntervjuService;

@RestController
@RequestMapping("/api/intervjui")
@CrossOrigin(origins = "http://localhost:8080")
public class IntervjuController {
    @Autowired
    private IntervjuService intervjuService;
    @PostMapping("/zakazi")
    public ResponseEntity<String> zakaziIntervju(@RequestBody IntervjuDTO dto) {
        boolean ok = intervjuService.zakaziIntervju(
                dto.prijavaId,
                dto.regruterId,
                dto.datum,
                dto.komentari,
                dto.tipIntervjua,
                dto.lokacija,
                dto.linkIntervjua
        );
        return ok ? ResponseEntity.ok("Intervju zakazan.") : ResponseEntity.status(500).body("Greška");
    }


}
