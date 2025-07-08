import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apply-for-advertisement',
  templateUrl: './apply-for-advertisement.component.html',
  styleUrls: ['./apply-for-advertisement.component.scss']
})
export class ApplyForAdvertisementComponent implements OnInit{

    constructor( private projectService:ProjectService,
                     private activeRoute: ActivatedRoute,
                     private router: Router
        ){} 

    userData:any = [];

    input:any = {};

    candidate : any = [];
    candidateData : any = [];
    new = true;
    logInData: any = [];

    application :any = {};

    linkParams:any = [];

    username = "";
    

    ngOnInit(): void {
        
    /*  const storedUser = localStorage.getItem('userData');
      if(storedUser){
        this.userData = JSON.parse(storedUser);
       // console.log(this.userData);
      }else{
        console.log("no user data found")
      }*/
     
      this.activeRoute.params.subscribe(params => {
          
          if(params['username']){

            this.username = params['username'];
            console.log(this.username);
      
            this.projectService.getCandidateByUsername(this.username).subscribe(data => {
                //console.log(data);
                this.candidateData = data;
               // console.log(this.input);

                console.log(this.candidateData)

                if(data != null){
                  this.input = this.candidateData;
                  this.new = false;
                }else{
                  
                  console.log("new candidate");
                  this.projectService.getUserData(this.username).subscribe(data2 => {
                        console.log(data2);
                        this.logInData = data2;
                        
                        this.input.ime = this.logInData.ime;
                        this.input.prezime = this.logInData.prezime;
                        this.input.email = this.logInData.email;
                        this.input.username = this.username;
                        this.input.obrazovanje = "";
                        this.input.radno_iskustvo ="";
                        this.input.sertifikati = "";
                        this.input.jezici = "";

                      })
                      
                    
                }


                console.log(this.input);


              })
            }
            //sacuvaj kandidata
            //dodaj prijavu

            console.log(params);
            this.linkParams = params;

          
      })


    }

    Save(){

      this.application.kandidat_id = this.input.id;
      this.application.pozicija_id = parseInt(this.linkParams.positionID,10);

      console.log(this.application);

       if(this.new){
              
        console.log("add new candidate");

          //insert new candidate
          this.projectService.insertCandidate(this.input).subscribe(data => {
               console.log(data);
          
               //get new candidate
               this.projectService.getCandidateByUsername(this.username).subscribe(data => {  
                    this.candidateData = data;
                    console.log(this.candidateData);

                      this.application.kandidat_id = this.candidateData.id;
                     console.log(this.application);
                    //napravi novu prijavu
                    this.projectService.insertApplication(this.application).subscribe(data => {
                        console.log(data);
                        this.router.navigate([`/user-homepage/${this.username}`]);                
                    })
     
            })

          })
        }else{
              //update candidate info
               this.projectService.updateCandidateByID(this.input.id,this.input).subscribe(data => {
                   
               
                  this.application.kandidat_id = this.input.id;
                  console.log(this.application);

                   this.projectService.insertApplication(this.application).subscribe(data => {
                     console.log(data);
                     this.router.navigate([`/user-homepage/${this.username}`]);               
                })
                
                   
                })
        }

     
      /*     
           //this.application.id = this.candidateData.id;
        
           this.projectService.getCandidateByUsername(this.username).subscribe(data => {  
           
                this.candidateData = data;
                console.log(this.candidateData);
    

              //napravi novu prijavu
             /*   this.projectService.insertApplication(this.application).subscribe(data => {
                  console.log(data);
                                  
                })*/
     
         /*   })*/

    
      



    }


}
