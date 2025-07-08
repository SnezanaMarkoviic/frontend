import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss']
})


export class AdminHomepageComponent implements OnInit{
  
  constructor(private projectservice: ProjectService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  
  

  advertisementData:any = [];
  regruterData:any = [];
  logInData:any = [];
  
  username = "";
 
  ngOnInit(): void {
   
   /* const storedUser = localStorage.getItem('userData');
    if(storedUser){
      this.logInData = JSON.parse(storedUser);
      //console.log(this.logInData);
    }else{
      console.log("no user data found");
    }*/
    
      
    this.activatedRoute.params.subscribe(params => {
      if(params['username']){

         this.username = params['username'];
  
          this.projectservice.getRegruterByUsername(this.username).subscribe(data => {
              this.regruterData = data;
              
              //console.log("regruter: ");
              console.log(this.regruterData); 
              //console.log("id firme")
              //console.log(this.regruterData.idFirme) 

                  this.projectservice.getAllPositionsOfOneFirmByID(this.regruterData.idFirme).subscribe(data => {
                        this.advertisementData = data;
                  })
                
          })
      }
    })
      
  }
   
  deletePosition(positionID:any){
    if(confirm("Are you sure?")){
      this.projectservice.deletePosition(positionID).subscribe(data => {
       // alert("Deleted");
        this.ngOnInit(); //refresh
      })
    }
  } 

  
  logOut(){
       window.location.replace('');
      window.location.replace('');
      window.location.replace('');
      window.location.replace('');
       //history.pushState(null,'');
  }



}
