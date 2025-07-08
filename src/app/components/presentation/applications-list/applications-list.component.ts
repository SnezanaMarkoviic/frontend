import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit{

    constructor(private projectservice: ProjectService,
               private activatedRoute: ActivatedRoute 
    ){ }
       
       applicationsData:any = [];
       //userData:any = [];
       username = "";
   
      
      
       ngOnInit(): void {
         
       /*  const storedUser = localStorage.getItem('userData');
         if(storedUser){
           this.userData = JSON.parse(storedUser);
           console.log(this.userData);
         }*/

      this.activatedRoute.params.subscribe(params => {
      if(params['username']){
       
        this.username = params['username'];
       
        this.projectservice.getAllPositionsOfOneCandidateByUsername(this.username).subscribe(data => {
           console.log(data);
           this.applicationsData = data;
           console.log(params);
         }) 
      }   
     
       })
        


}
}
