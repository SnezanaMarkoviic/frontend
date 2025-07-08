package com.example.demo.services;

import com.example.demo.models.UserModel;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public boolean register(UserModel user) {
        boolean emailZauzet = userRepository.existsByEmail(user.getEmail());
        boolean usernameZauzet = userRepository.existsByUsername(user.getUsername());

        if (emailZauzet || usernameZauzet) {
            return false;
        }

        int rezultat = userRepository.registerUser(user);

        if (rezultat > 0) {
            // Slanje emaila nakon uspešne registracije
            emailService.sendRegistrationEmail(user.getEmail(), user.getName());
            return true;
        }

        return false;
    }
}
