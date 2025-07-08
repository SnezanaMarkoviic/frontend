import { Component } from '@angular/core';
import { ProjectService } from '../../services/services/project.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export interface User {
  id: number;
  ime: string;
  prezime: string;
  email: string;
  username: string;
  lozinka: string;
  tip: string;
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  public isActive: boolean = false;

  constructor(private projectservice: ProjectService,
    private router: Router,
    private location: Location) { }

  
  userSignUpData: any = {};
  username = "";

  registartionInput: any = {};
  registrationErrors: { [key: string]: string } = {};

  input: any = {};

  userData: User = { id: 0, ime: '', prezime: '', email: '', username: '', lozinka: '', tip: '' };

  showUsernameError: string = '';
  showPasswordError: string = '';

  onRegisterClick() {
    this.isActive = true;
  }

  onLogInClick() {
    this.isActive = false;
  }

  logIn() {
    this.showUsernameError = '';
    this.showPasswordError = '';

    const username = this.input.username?.trim();
    const password = this.input.lozinka?.trim();

    if (!username) {
      this.showUsernameError = 'Obavezno polje';
    }

    if (!password) {
      this.showPasswordError = 'Obavezno polje';
    }

    if (!username || !password) {
      return;
    }

    this.projectservice.getLogInData(username).subscribe((data: User | null) => {
      if (!data) {
        this.showUsernameError = "Korisnik nije pronađen.";
        return;
      }

      this.userData = data;

      const trimmedUsername = username;
      const trimmedPassword = password;

      if (
        trimmedUsername === this.userData.username?.trim() &&
        trimmedPassword === this.userData.lozinka?.trim()
      ) {
        localStorage.setItem('userData', JSON.stringify(this.userData));

        if (this.userData.tip?.trim().toLowerCase() === "regruter") {
          window.location.replace('');
          window.location.replace('');
          window.location.replace('');
          window.location.replace('');
          window.location.replace(`/admin-homepage/${username}`);
        } else if (this.userData.tip?.trim().toLowerCase() === "kandidat") {
          window.location.replace('');
          window.location.replace('');
          window.location.replace('');
          window.location.replace('');
          window.location.replace(`/user-homepage/${username}`);
        }
      } else {
        this.showUsernameError = 'Pogrešan username ili lozinka';
        this.showPasswordError = 'Pogrešan username ili lozinka';
      }
    }, error => {
      this.showUsernameError = "Došlo je do greške pri prijavi.";
    });
  }


  
  clearError(field: string) {
  if (this.registrationErrors[field]) {
    delete this.registrationErrors[field];
  }

  if (field === 'username' && this.showUsernameError) {
    this.showUsernameError = '';
  }

  if (field === 'password' && this.showPasswordError) {
    this.showPasswordError = '';
  }
}
  async validateRegistration(): Promise<boolean> {
  this.registrationErrors = {};

  if (!this.registartionInput.name || !this.registartionInput.name.trim()) {
    this.registrationErrors['ime'] = "Ime je obavezno";
  }
  if (!this.registartionInput.surname || !this.registartionInput.surname.trim()) {
    this.registrationErrors['prezime'] = "Prezime je obavezno";
  }
  if (!this.registartionInput.email || !this.registartionInput.email.trim()) {
    this.registrationErrors['email'] = "Email je obavezan";
  } else if (!this.validateEmail(this.registartionInput.email)) {
    this.registrationErrors['email'] = "Email nije validan";
  }

  if (!this.registartionInput.username || !this.registartionInput.username.trim()) {
    this.registrationErrors['username'] = "Username je obavezan";
  } else {
    const usernameExists = await this.usernameExists(this.registartionInput.username);
    if (usernameExists) {
      this.registrationErrors['username'] = "Username već postoji";
    }
  }

  if (!this.registartionInput.password || !this.registartionInput.password.trim()) {
    this.registrationErrors['password'] = "Lozinka je obavezna";
  }

  return Object.keys(this.registrationErrors).length === 0;
}

/*
  validateRegistration(): boolean {
    this.registrationErrors = {};

    if (!this.registartionInput.name || !this.registartionInput.name.trim()) {
      this.registrationErrors['ime'] = "Ime je obavezno";
    }
    if (!this.registartionInput.surname || !this.registartionInput.surname.trim()) {
      this.registrationErrors['prezime'] = "Prezime je obavezno";
    }
    if (!this.registartionInput.email || !this.registartionInput.email.trim()) {
      this.registrationErrors['email'] = "Email je obavezan";
    } else if (!this.validateEmail(this.registartionInput.email)) {
      this.registrationErrors['email'] = "Email nije validan";
    }
    if (!this.registartionInput.username || !this.registartionInput.username.trim()) {
      this.registrationErrors['username'] = "Username je obavezan";
    }else if(!this.validateUsername(this.registartionInput.username)){
         this.registrationErrors['username'] = "Username vec postoji";  
    }
    if (!this.registartionInput.password || !this.registartionInput.password.trim()) {
      this.registrationErrors['password'] = "Lozinka je obavezna";
    }

    return Object.keys(this.registrationErrors).length === 0;
  }
*/
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
 
  usernameExists(username: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    this.projectservice.getLogInData(username).subscribe(
      data => resolve(data !== null),
      error => resolve(false)  // ili reject(error) ako želiš
    );
  });
}
  async onRegisterSubmit() {
  const isValid = await this.validateRegistration();
  if (isValid) {
    console.log("Registracija validna:", this.registartionInput);
    
    this.userSignUpData.username = this.registartionInput.username;
    this.userSignUpData.ime = this.registartionInput.name;
    this.userSignUpData.prezime = this.registartionInput.surname;
    this.userSignUpData.email = this.registartionInput.email;
    this.userSignUpData.lozinka = this.registartionInput.password;
    this.userSignUpData.tip = "kandidat";
    
    this.username = this.userSignUpData.username;


    this.projectservice.insertUser(this.userSignUpData).subscribe(data => {
      console.log(data);
    
  
      //alert("Created");
      //this.router.navigate() ?????? ima kao opcija
      // localStorage.setItem('userData', JSON.stringify(this.userData));
      window.location.replace('');
      window.location.replace('');
      window.location.replace('');
      window.location.replace('');
      window.location.replace(`/user-homepage/${this.username}`);
  
    })


  } else {
    console.log("Greške u formi:", this.registrationErrors);
  }
}
 

  /*
  //validacija user-a
    validateUsername(username: string): boolean{
           
       this.projectservice.getLogInData(username).subscribe(data => {
           console.log(data);

           if(data === null){
                console.log("data je null");
                return true;
           }else{
                return false;
           }
       })
       return false;

    }
*/



/*
  onRegisterSubmit() {
    if (this.validateRegistration()) {
      // Ovde možeš da pozoveš servis za registraciju ili dalje procesiranje
      console.log("Registracija validna:", this.registartionInput);

      // Primer: navigacija na admin stranicu nakon registracije
      //this.router.navigate(['/admin-homepage']);

    } else {
      console.log("Greške u formi:", this.registrationErrors);
    }*/
  




/*
         //console.log(this.input.username)
         this.projectservice.getLogInData(this.input.username).subscribe((data: User) => {
            //console.log(data);
            this.userData = data;
            
             console.log(this.input.username?.trim());
             console.log(this.userData.username?.trim());
          
             console.log(this.input.lozinka?.trim());
             console.log(this.userData.lozinka?.trim());


          if(this.input.username?.trim() === this.userData.username?.trim() && this.input.lozinka?.trim() === this.userData.lozinka?.trim()){
                  console.log(true)

                  localStorage.setItem('userData', JSON.stringify(this.userData));
                  //localStorage.setItem('username', this.userData.username);
                  
                  if(this.userData.tip?.trim().toLowerCase() === "regruter"){
                       this.router.navigate(['/admin-homepage'],{replaceUrl:true});
                      //this.location.replaceState('/admin-homepage');
                      sessionStorage.clear();
                       history.replaceState(null, '', '/user-homepage');
                      window.location.replace('/admin-homepage');
                 
                  }else if(this.userData.tip?.trim().toLowerCase() === "kandidat"){
                      this.router.navigate(['/user-homepage'],{replaceUrl:true});
                      //this.location.replaceState('/user-homepage');
                      window.location.replace('/user-homepage');
                  }
            }else {
               this.showUsernameError = "Pogresan username ili lozinka";
          }

         
         
         
          })
  */         
         
  

  
  
}
