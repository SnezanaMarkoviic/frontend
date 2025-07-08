-- Kreiranje baze podataka
CREATE DATABASE IF NOT EXISTS sistem_regrutacije;
USE sistem_regrutacije;

CREATE TABLE zahtjevi_oglasa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    oglas_id INT NOT NULL,
    tip ENUM('OBRAZOVANJE', 'SERTIFIKAT', 'JEZIK', 'ISKUSTVO') NOT NULL,
    vrijednost VARCHAR(100) NOT NULL,
    obavezno BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (oglas_id) REFERENCES oglasi(id) ON DELETE CASCADE
);
drop table zahtjevi_oglasa;
CREATE TABLE sektori (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE oglasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv_pozicije VARCHAR(100) NOT NULL,
    opis_posla TEXT NOT NULL,
    radno_iskustvo VARCHAR(100),
    kvalifikacije TEXT,
    lokacija VARCHAR(100),
    datum_objave DATETIME DEFAULT CURRENT_TIMESTAMP,
    datum_isteka DATETIME,
    regruter_email VARCHAR(100) NOT NULL
);
ALTER TABLE oglasi
ADD sektor_id INT,
ADD CONSTRAINT fk_sektor
    FOREIGN KEY (sektor_id)
    REFERENCES sektori(id)
    ON DELETE SET NULL;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('KANDIDAT', 'REGRUTER') NOT NULL,
    kandidat_id INT,
    regruter_id INT,
    FOREIGN KEY (kandidat_id) REFERENCES kandidati(id) ON DELETE CASCADE,
    FOREIGN KEY (regruter_id) REFERENCES regruteri(id) ON DELETE CASCADE
);
drop table users;
-- Kreiranje tabele kandidati
CREATE TABLE kandidati (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefon VARCHAR(20),
    radno_iskustvo_godine INT CHECK (radno_iskustvo_godine >= 0),
    obrazovanje VARCHAR(100),
    sertifikati VARCHAR(100),
    jezici VARCHAR(100),
    status_prijave ENUM('U razmatranju', 'Poziv za intervju', 'Odbijen', 'Prihvaćen') DEFAULT 'U razmatranju',
    datum_registracije DATETIME DEFAULT CURRENT_TIMESTAMP,
    lozinka VARCHAR(255),
    username varchar(255)
);
drop table kandidati;

-- Kreiranje tabele prijave
CREATE TABLE prijave (
    id INT AUTO_INCREMENT PRIMARY KEY,
    oglas_id INT,
    kandidat_id INT NOT NULL,
    status_prijave ENUM('U razmatranju', 'Odbijen', 'Prihvaćen') DEFAULT 'U razmatranju',
    datum_prijave DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kandidat_id) REFERENCES kandidati(id) ON DELETE CASCADE,
    FOREIGN KEY (oglas_id) REFERENCES oglasi(id) ON DELETE CASCADE
);
ALTER TABLE prijave ADD CONSTRAINT unikatan_par UNIQUE (oglas_id, kandidat_id);

-- Kreiranje tabele regruteri
CREATE TABLE regruteri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefon VARCHAR(20),
    lozinka VARCHAR(255),
    username varchar(255)
);

-- Kreiranje tabele intervjui
CREATE TABLE intervjui (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prijava_id INT NOT NULL,
    regruter_id INT NOT NULL,
    datum_intervjua DATETIME NOT NULL,
    komentari TEXT,
    ocjena DECIMAL(3,2),
    FOREIGN KEY (prijava_id) REFERENCES prijave(id) ON DELETE CASCADE,
    FOREIGN KEY (regruter_id) REFERENCES regruteri(id) ON DELETE CASCADE
);
ALTER TABLE intervjui 
ADD COLUMN tip_intervjua VARCHAR(10) NOT NULL DEFAULT 'online',
ADD COLUMN lokacija VARCHAR(255) DEFAULT NULL,
ADD COLUMN link_intervjua VARCHAR(255) DEFAULT NULL;
-- Kreiranje tabele testovi
CREATE TABLE testovi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv_testa VARCHAR(100) NOT NULL,
    opis_testa TEXT,
    pozicija_id INT NOT NULL,
    FOREIGN KEY (pozicija_id) REFERENCES pozicije(id) ON DELETE CASCADE
);

-- Kreiranje tabele testiranja (kandidati koji su polagali testove)
CREATE TABLE testiranja (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prijava_id INT NOT NULL,
    test_id INT NOT NULL,
    rezultat DECIMAL(5,2),
    datum_polaganja DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prijava_id) REFERENCES prijave(id) ON DELETE CASCADE,
    FOREIGN KEY (test_id) REFERENCES testovi(id) ON DELETE CASCADE
);

-- Kreiranje tabele obavestenja
CREATE TABLE obavestenja (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kandidat_id INT,
    sadrzaj TEXT NOT NULL,
    status ENUM('Nepročitano', 'Pročitano') DEFAULT 'Nepročitano',
    datum_slanja DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kandidat_id) REFERENCES kandidati(id) ON DELETE CASCADE
);
