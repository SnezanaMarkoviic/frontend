/*import { Component } from '@angular/core';
import { WitService } from '../../services/WitService';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent {
  isOpen: boolean = false;  // Kontrola da li je chat bot otvoren
  newMessage: string = '';   // Novi unos od korisnika
  userMessages: string[] = []; // Lista korisničkih poruka
  botMessages: string[] = [];  // Lista botovih odgovora

  constructor(private witService: WitService) {}

  // Funkcija koja otvara/zatvara chat bot
  toggleChatBot() {
    this.isOpen = !this.isOpen;
  }

  // Funkcija koja šalje poruku
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Prvo dodajemo korisničku poruku
      this.userMessages.push(this.newMessage);

      // Pozivamo WitService da pošaljemo poruku
      this.witService.sendMessageToWitAi(this.newMessage).subscribe(
        (data) => {
          // Proveravamo odgovor od Wit.ai i dodajemo ga u botMessages
          const botReply = this.getBotResponse(data);
          this.botMessages.push(botReply);  // Dodajemo botov odgovor
        },
        (error) => {
          console.error('Greška pri slanju poruke:', error);
          this.botMessages.push('Došlo je do greške. Pokušajte ponovo!');
        }
      );

      this.newMessage = '';  // Resetujemo unos
    }
  }

  // Funkcija koja analizira odgovor od Wit.ai i vraća odgovarajući odgovor
  private getBotResponse(data: any): string {
    if (data && data.intents && data.intents.length > 0) {
      const intent = data.intents[0].name;  // Prvo prepoznati intent

      // Obrada različitih intents-a
      switch (intent) {
        case 'Pozdrav':
          return 'Zdravo! Kako mogu da vam pomognem?';
        case 'Vreme_odgovora':
          return 'Odgovor od regrutera obično dolazi u roku od 1 do 2 nedelje, zavisno od pozicije i broja kandidata.';
        default:
          return 'Nisam siguran šta to znači. Pokušajte ponovo!';
      }
    }

    return 'Nisam siguran šta to znači. Pokušajte ponovo!';
  }
}*/

/*
import { Component, OnInit } from '@angular/core';
import { WitService } from '../../services/WitService';

declare var tidioChatApi: any;

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})

export class ChatBotComponent implements OnInit {
  isOpen: boolean = false;  // Kontrola da li je chat bot otvoren
  newMessage: string = '';   // Novi unos od korisnika
  userMessages: string[] = []; // Lista korisničkih poruka
  botMessages: string[] = [];  // Lista botovih odgovora

   

  constructor(private witService: WitService) {}

  ngOnInit() {
    // Postavljanje jezika na srpski (koji je vrlo blizak crnogorskom)
    window.addEventListener('load', function() {
      if (typeof tidioChatApi !== 'undefined') {
        tidioChatApi.setLanguage('sr');
      }
    });
  }

  // Funkcija koja otvara/zatvara chat bot
  toggleChatBot() {
    this.isOpen = !this.isOpen;
  }

  // Funkcija koja šalje poruku
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Prvo dodajemo korisničku poruku
      this.userMessages.push(this.newMessage);

      // Pozivamo WitService da pošaljemo poruku
      this.witService.sendMessageToWitAi(this.newMessage).subscribe(
        (data) => {
          // Proveravamo odgovor od Wit.ai i dodajemo ga u botMessages
          const botReply = this.getBotResponse(data);
          this.botMessages.push(botReply);  // Dodajemo botov odgovor
        },
        (error) => {
          console.error('Greška pri slanju poruke:', error);
          this.botMessages.push('Došlo je do greške. Pokušajte ponovo!');
        }
      );

      this.newMessage = '';  // Resetujemo unos
    }
  }

  // Funkcija koja analizira odgovor od Wit.ai i vraća odgovarajući odgovor
  private getBotResponse(data: any): string {
    if (data && data.intents && data.intents.length > 0) {
      const intent = data.intents[0].name;  // Prvo prepoznati intent

      // Obrada različitih intents-a
      switch (intent) {
        case 'Pozdrav':
          return 'Zdravo! Kako mogu da vam pomognem?';
        case 'Vreme_odgovora':
          return 'Odgovor od regrutera obično dolazi u roku od 1 do 2 nedelje, zavisno od pozicije i broja kandidata.';
        default:
          return 'Nisam siguran šta to znači. Pokušajte ponovo!';
      }
    }

    return 'Nisam siguran šta to znači. Pokušajte ponovo!';
  }
}*/

import { Component } from '@angular/core';
import { WitService } from '../../services/WitService';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent {
  isOpen: boolean = false;  // Kontrola da li je chat bot otvoren
  newMessage: string = '';   // Novi unos od korisnika
  userMessages: string[] = []; // Lista korisničkih poruka
  botMessages: string[] = [];  // Lista botovih odgovora

  // Default odgovori na često postavljana pitanja
  defaultResponses: { [key: string]: string } = {
    'zdravo': 'Zdravo! Kako mogu da vam pomognem?',
    'kad mogu da ocekujem odgovor od regrutera': 'Odgovor od regrutera obično dolazi u roku od 1 do 2 nedelje, zavisno od pozicije i broja kandidata.',
    'kontakt': 'Možete nas kontaktirati na email: support@company.com',
    'radno vrijeme': 'Radno vreme je od 9 do 17, od ponedeljka do petka.',
    'koliko traje period regrutovanja': 'Period regrutovanja obično traje između 3 i 4 nedelje, u zavisnosti od pozicije i broja kandidata.',
    'kako mogu da se prijavim': 'Prijave možete poslati putem naše zvanične stranice u sekciji "Karijere".',
    'kakav je proces selekcije': 'Proces selekcije obuhvata intervju sa HR menadžerom, tehnički intervju sa liderom tima, i konačnu odluku od strane menadžmenta.'
  };

  constructor(private witService: WitService) {}

  // Funkcija koja otvara/zatvara chat bot
  toggleChatBot() {
    this.isOpen = !this.isOpen;
  }

  // Funkcija koja šalje poruku
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Resetujemo botMessages i userMessages da obrišemo prethodne poruke
      this.botMessages = [];
      this.userMessages = [];

      // Dodajemo korisničku poruku
      this.userMessages.push(this.newMessage);

      // Proveravamo da li postoji default odgovor za postavljeno pitanje
      const defaultResponse = this.getDefaultResponse(this.newMessage);
      
      if (defaultResponse) {
        // Ako postoji default odgovor, odmah ga dodajemo
        this.botMessages.push(defaultResponse);
      } else {
        // Ako ne postoji default odgovor, šaljemo poruku Wit.ai
        this.witService.sendMessageToWitAi(this.newMessage).subscribe(
          (data) => {
            const botReply = this.getBotResponse(data);
            this.botMessages.push(botReply);  // Dodajemo odgovor od Wit.ai
          },
          (error) => {
            console.error('Greška pri slanju poruke:', error);
            this.botMessages.push('Došlo je do greške. Pokušajte ponovo!');
          }
        );
      }

      this.newMessage = '';  // Resetujemo unos
    }
  }

  // Funkcija koja proverava da li postoji default odgovor
  private getDefaultResponse(message: string): string | null {
    // Uzimamo korisničku poruku u malim slovima i bez razmaka
    const trimmedMessage = message.trim().toLowerCase();
    const response = this.defaultResponses[trimmedMessage];
    return response ? response : null;
  }

  // Funkcija koja analizira odgovor od Wit.ai i vraća odgovarajući odgovor
  private getBotResponse(data: any): string {
    if (data && data.intents && data.intents.length > 0) {
      const intent = data.intents[0].name;

      // Obrada različitih intents-a
      switch (intent) {
        case 'Pozdrav':
          return 'Zdravo! Kako mogu da vam pomognem?';
        case 'Kad_odgovor_regrutera':
          return 'Odgovor od regrutera obično dolazi u roku od 1 do 2 nedelje, zavisno od pozicije i broja kandidata.';
        default:
          return 'Nisam siguran šta to znači. Pokušajte ponovo!';
      }
    }

    return 'Nisam siguran šta to znači. Pokušajte ponovo!';
  }
}