package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void posaljiStatusPrijaveMail(String kandidatEmail, String imeRegrutera, String nazivPozicije, String noviStatus) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(kandidatEmail);
        message.setSubject("Ažuriran status prijave za poziciju: " + nazivPozicije);

        String body = String.format("""
                Poštovani,

                Regruter %s je ažurirao status Vaše prijave za poziciju "%s".
                Novi status: %s

                Hvala na interesovanju!

                Srdačno,
                Tim za regrutaciju
                """, imeRegrutera, nazivPozicije, noviStatus);

        message.setText(body);
        message.setFrom("regrutacija@gmail.com");

        mailSender.send(message);
    }

    public void sendRegistrationEmail(String to, String firstName) {
        System.out.println("📧 Pokušavam da pošaljem mejl na: " + to);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Dobrodošli na naš sajt!");
        message.setText("Zdravo " + firstName + ",\n\nHvala što ste se registrovali na naš sajt.\nUživajte u korišćenju!\n\nPozdrav,\nVaš tim");

        try {
            mailSender.send(message);
            System.out.println("Email poslat na: " + to);
        } catch (Exception e) {
            System.out.println(" GREŠKA pri slanju emaila: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }


}
