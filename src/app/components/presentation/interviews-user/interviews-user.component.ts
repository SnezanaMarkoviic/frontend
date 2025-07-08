/*
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ProjectService } from '../../services/services/project.service';
import { addHours } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-interviews-user',
  templateUrl: './interviews-user.component.html',
  styleUrls: ['./interviews-user.component.scss']
})
export class InterviewsUserComponent implements OnInit {  
  collapseState = 'closed';
  showSelectedDayInterviews: boolean = false; // Flag to toggle the visibility of selected day interviews
  
  toggle() {
    this.collapseState = this.collapseState === 'open' ? 'closed' : 'open';
  }

  viewDate: Date = new Date();
  regruter_username = ""; // You can replace this with actual auth username
  candidates: any = [];
  scheduledInterviews: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false; 
  candidate_username: any = "";
  selectedDayInterviews: any[] = [];
  selectedDateDisplay: string = '';
  regruterData :any = [];
  interviews:any[] = [];
  interview:any = [];

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['username']) {
        this.candidate_username = params['username'].replace(/['\]]/g, ''); // sanitize username
        console.log("Correct username:", this.candidate_username);
      }
        // Fetch interviews once username is available
        this.projectService.getAllInterviewsByCandidateUsername(this.candidate_username).subscribe(data => {
          console.log('Fetched interviews:', data);
         this.scheduledInterviews = data.map(interview => ({
            start: new Date(interview.datum_intervjua),
            end: addHours(new Date(interview.datum_intervjua), 1),
            title: `Interview with recruiter: ${interview.usernameRegrutera}`,
            color: { primary: '#1e90ff', secondary: '#D1E8FF' }
          }));
          this.selectedDayInterviews = data;
          
 

        const interviewRequests = data.map(interview => {
              this.projectService.getRegruterByUsername(interview.usernameRegrutera).subscribe(recruiterData => {
                // Attach the recruiter’s name to the interview
                this.regruterData = recruiterData;
                interview.recruiterName = `${this.regruterData.ime} ${this.regruterData.prezime}`;
                
                this.interview.naziv_pozicije = interview.naziv_pozicije;
                this.interview.datum_intervjua = interview.datum_intervjua;
                this.interview.imeRegrutera = this.regruterData.ime;
                this.interview.prezimeRegrutera = this.regruterData.prezime;

                console.log(this.interview);
                
                this.interviews.push(interview);
                
                // Update the interview event details for calendar
                this.scheduledInterviews.push({
                  start: new Date(interview.datum_intervjua),
                  end: addHours(new Date(interview.datum_intervjua), 1),
                  title: `Interview with recruiter: ${interview.recruiterName}`, // Use the full name of the recruiter
                  color: { primary: '#1e90ff', secondary: '#D1E8FF' }
                });

        });
      
    });
  })
})

  

}


  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  dayClicked(date: Date): void {
    if (this.isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      this.activeDayIsOpen = true;

      const formattedDate = format(date, 'yyyy-MM-dd');
      this.selectedDateDisplay = format(date, 'dd.MM.yyyy');

      this.projectService.getInterviewsByDate(this.regruter_username, formattedDate).subscribe(data => {
        this.scheduledInterviews = data.map(interview => ({
          start: new Date(interview.datum_intervjua),
          end: addHours(new Date(interview.datum_intervjua), 1),
          title: `Interview with ${interview.usernameKandidata} (${interview.naziv_pozicije})`,
          color: { primary: '#1e90ff', secondary: '#D1E8FF' }
        }));

        // Save for display below
        this.selectedDayInterviews = data;

        // Toggle the visibility of selected day interviews div
        this.showSelectedDayInterviews = !this.showSelectedDayInterviews;
      });
    }
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { ProjectService } from '../../services/services/project.service';
import { addHours } from 'date-fns';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interviews-user',
  templateUrl: './interviews-user.component.html',
  styleUrls: ['./interviews-user.component.scss']
})
export class InterviewsUserComponent implements OnInit {
  collapseState = 'closed';
  showSelectedDayInterviews: boolean = false;
  viewDate: Date = new Date();
  regruter_username = "";
  candidates: any = [];
  scheduledInterviews: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  candidate_username: string = '';
  selectedDayInterviews: any[] = [];
  selectedDateDisplay: string = '';
  regruterData: any = [];
  interviews: any[] = [];

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['username']) {
        this.candidate_username = params['username'].replace(/['\]]/g, ''); // sanitize username
        console.log("Correct username:", this.candidate_username);

        // Fetch interviews once username is available
        this.projectService.getAllInterviewsByCandidateUsername(this.candidate_username).subscribe(data => {
          console.log('Fetched interviews:', data);

          // Fetch recruiter details for each interview in parallel using forkJoin
          const interviewRequests = data.map(interview => {
            return this.projectService.getRegruterByUsername(interview.usernameRegrutera).pipe(
              map((recruiterData:any) => ({
                ...interview,
                recruiterName: `${recruiterData.ime} ${recruiterData.prezime}`, // Add recruiter name
                imeRegrutera: recruiterData.ime,
                prezimeRegrutera: recruiterData.prezime
              }))
            );
          });

          // Use forkJoin to wait for all recruiter data to be fetched
          forkJoin(interviewRequests).subscribe(updatedInterviews => {
            console.log('Updated interviews with recruiters:', updatedInterviews);

            // Now update both the interviews array and the scheduledInterviews
            this.interviews = updatedInterviews;
            this.selectedDayInterviews = updatedInterviews; // Save for display below
            
            // Update the calendar events
            this.scheduledInterviews = updatedInterviews.map((interview:any) => ({
              start: new Date(interview.datum_intervjua),
              end: addHours(new Date(interview.datum_intervjua), 1),
              title: `Interview with recruiter: ${interview.recruiterName}`,
              color: { primary: '#1e90ff', secondary: '#D1E8FF' }
            }));
          });
        });
      } else {
        console.warn("No username param found.");
      }
    });
  }

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
}
