import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {

  candidatesData: any = [];
  applicationMap: { [candidateId: number]: any } = {};

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        const positionId = params['id'];

        this.projectService.getAllCandiatesByPositionID(positionId).subscribe(candidates => {
          this.candidatesData = candidates;
         
          
          console.log(this.candidatesData)
          
           let i = 0;
         if(candidates != null){
           // Za svakog kandidata, dohvati njegovu prijavu
          this.candidatesData.forEach((candidate: any )=> {
            this.projectService.getApplicationByID(positionId, candidate.id).subscribe(application => {
              this.applicationMap[candidate.id] = application;
             // console.log(application);
             //this.candidatesData[candidate.id].status_prijave = this.applicationMap[candidate.id].status_prijave;
              console.log(this.applicationMap[candidate.id].status_prijave);
              console.log(this.candidatesData[i]);
              this.candidatesData[i].status_prijave = this.applicationMap[candidate.id].status_prijave;
              this.candidatesData[i].datum_prijave = this.applicationMap[candidate.id].datum_prijave;
              i++;
            });
            });
          }
          
        });
      }
    });
    console.log(this.applicationMap);
  }

  onStatusChange(candidate: any) {
    const application = this.applicationMap[candidate.id];

    if (!application) {
      console.error("Nema pronađene prijave za kandidata:", candidate.id);
      return;
    }

    // Ažuriraj status
    application.status_prijave = candidate.status_prijave; 

    console.log(application);
    console.log('Sending to backend:', JSON.stringify(application));

    console.log(application.idKandidata);

    this.projectService.updateApplicationByID(application.id, application).subscribe(data => {
      console.log("Ažurirano:", data);
      //this.ngOnInit(); 
    });
  }
}