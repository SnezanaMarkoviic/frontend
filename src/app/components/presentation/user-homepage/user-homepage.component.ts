import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss']
})
export class UserHomepageComponent implements OnInit{

   constructor(private projectservice: ProjectService,
               private activatedRoute: ActivatedRoute, 
   ){ }
    
    //advertisementData:any = [];
    newAdvertisementData:any = [];
   // userData:any = [];
   username = "";
   
   
    ngOnInit(): void {
         
    /*   const storedUser = localStorage.getItem('userData');
       if(storedUser){
        this.userData = JSON.parse(storedUser);
       // console.log(this.userData);
       }*/
    this.activatedRoute.params.subscribe(params => {
      if(params['username']){
       
        this.username = params['username'];
       
        this.projectservice.getAllNewPositionsForCandidate(params['username']).subscribe(data => {
          console.log(data);
          this.newAdvertisementData = data;
          console.log(this.newAdvertisementData);
        })
      }
      console.log(params);
    })

      
    
    
    

  /*    this.projectservice.getAllPositions().subscribe(data => {
        console.log(data);
        this.advertisementData = data;
      })*/

    }
     
  
   
  logOut(){
    window.location.replace('');
    window.location.replace('');
    window.location.replace('');

  }


}
