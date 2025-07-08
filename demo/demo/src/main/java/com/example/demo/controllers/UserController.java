package com.example.demo.controllers;

import com.example.demo.models.UserModel;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.repositories.kandidatiRepository;
import com.example.demo.repositories.RegruterRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8080")
public class UserController {
    private final UserRepository userRepo;
    private final kandidatiRepository kandidatRepo;
    private final RegruterRepository regruterRepo;

    public UserController(UserRepository userRepo, kandidatiRepository kandidatRepo, RegruterRepository regruterRepo) {
        this.userRepo = userRepo;
        this.kandidatRepo = kandidatRepo;
        this.regruterRepo = regruterRepo;
    }

   /* @PostMapping("/register")
    public String register(@RequestBody UserModel user) {
        int result = userRepo.registerUser(user);
        if (result > 0) {
            if ("KANDIDAT".equalsIgnoreCase(user.getRole())) {
                kandidatRepo.insertBasicCandidateInfo(user);
            } else if ("REGRUTER".equalsIgnoreCase(user.getRole())) {
                regruterRepo.insertBasicRegruterInfo(user);
            }
            return "Registracija uspješna!";
        } else {
            return "Greška pri registraciji!";
        }
    }*/
   @Autowired
   private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserModel user) {
        boolean success = userService.register(user); // koristi servis koji šalje email

        if (!success) {
            if (userRepo.existsByEmail(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email je već u upotrebi.");
            } else if (userRepo.existsByUsername(user.getUsername())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Korisničko ime je već zauzeto.");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Greška pri registraciji!");
        }

        // Ubacivanje dodatnih podataka u zavisnosti od role
        if ("KANDIDAT".equalsIgnoreCase(user.getRole())) {
            kandidatRepo.insertBasicCandidateInfo(user);
        } else if ("REGRUTER".equalsIgnoreCase(user.getRole())) {
            regruterRepo.insertBasicRegruterInfo(user);
        }

        return ResponseEntity.ok("Registracija uspješna!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserModel loginRequest, HttpSession session) {
        UserModel user = userRepo.login(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            user.setPassword(null); // ukloni lozinku
            session.setAttribute("user", user); // ✅ čuvamo korisnika u sesiji
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Neispravno korisničko ime ili lozinka!");
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Uspješno ste se odjavili.");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        UserModel user = (UserModel) session.getAttribute("user");

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Niste ulogovani.");
        }

        user.setPassword(null); // sigurnost
        return ResponseEntity.ok(user);
    }

}
