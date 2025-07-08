package com.example.demo.controllers;

import com.example.demo.models.RegruterModel;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/regruteri")
@CrossOrigin(origins = "http://localhost:8080")
public class RegruterController {

    // Dodaj repo ako želiš logiku ovdje
    @GetMapping("/test")
    public String test() {
        return "Regruteri API radi!";
    }

    // Dodaj metode po potrebi
}

