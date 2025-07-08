import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/services/project.service';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-edit-advertisements',
  templateUrl: './edit-advertisements.component.html',
  styleUrls: ['./edit-advertisements.component.scss']
})
export class EditAdvertisementsComponent implements OnInit{

     advertisement:any = {}; 
     allData:any = {};
     edit = false;
     regruterData:any = [];
     logInData:any = [];
     username = "";
     
     constructor( private projectService:ProjectService,
                  private activeRoute: ActivatedRoute,
                  private router: Router
     ){}
  


     ngOnInit(): void {
        
      this.activeRoute.params.subscribe(params => {
        
        console.log(params);
        this.username = params['username'];
        
        if(params['id']){
          this.edit = true;
          this.projectService.getPositionByID(params['id']).subscribe(data => {
              this.advertisement = data;
          })
        }

      })
      

      const storedUser = localStorage.getItem('userData');
    if(storedUser){
      this.logInData = JSON.parse(storedUser);
      //console.log(this.logInData);
    }else{
      console.log("no user data found");
    }
    
  
    this.projectService.getRegruterByUsername(this.logInData.username).subscribe(data => {
         this.regruterData = data;

            this.projectService.getAllPositionsOfOneFirmByID(this.regruterData.idFirme).subscribe(data => {
                   this.allData = data;
            })

    })

    }


    saveProject(){

      if(this.edit){

        this.projectService.updatePosition(this.advertisement.id,this.advertisement).subscribe(data => {
          //alert("projekat updated");
          this.router.navigate([`/admin-homepage/${this.username}`]);
        })

      }else {
       
        this.advertisement.idFirme = this.regruterData.idFirme;
        this.advertisement.naziv_firme = this.allData[0].naziv_firme;
        
        this.projectService.addProject(this.advertisement).subscribe(data => {
          console.log(data);
         // alert("created");
          this.router.navigate([`/admin-homepage/${this.username}`]);
        })
         
        //console.log(this.advertisement);  
        //console.log(this.allData); 

      }



    }




    
   





}
