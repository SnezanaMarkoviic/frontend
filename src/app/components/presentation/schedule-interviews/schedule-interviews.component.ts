/*import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ProjectService } from '../../services/services/project.service';
import { addHours } from 'date-fns';
import { ActivatedRoute } from '@angular/router';

import { trigger, state, style, transition, animate } from '@angular/animations';

import { format } from 'date-fns';

@Component({
  selector: 'app-schedule-interviews',
  templateUrl: './schedule-interviews.component.html',
  styleUrls: ['./schedule-interviews.component.scss'],
  animations: [
    trigger('collapse', [
      state('open', style({
        height: '*',
        opacity: 1,
        display: 'block'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        display: 'none'
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ScheduleInterviewsComponent implements OnInit {

  collapseState = 'closed';

  toggle() {
    this.collapseState = this.collapseState === 'open' ? 'closed' : 'open';
  }



  viewDate: Date = new Date();
  regruter_username = ""; // You can replace this with actual auth username
  candidates: any = [];
  scheduledInterviews: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false; 


  selectedDayInterviews: any[] = [];
  selectedDateDisplay: string = '';


  constructor(private projectService: ProjectService,
              private activatedRoute: ActivatedRoute, 
  ) {}

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    if(params['username']){
      this.regruter_username = params['username'];
      
      // Now that username is set, load the data
    //  this.loadCandidates();
    //  this.loadScheduledInterviews();
    }
    console.log(params);
  });

      this.projectService.getAllInterviewsByRegruterUsername(this.regruter_username).subscribe(data => {
        console.log('Fetched interviews:', data); // See what you get back from API
        //const interviewedUsernames = data.map(i => i.usernameKandidata);
        const scheduledInterviews = data.map(i => ({
          kandidat_username: i.usernameKandidata,    // prilagodi polje ako je drugačije
          naziv_pozicije: i.naziv_pozicije           // moraš imati ovo u response-u API-ja!
        }));
         

          this.scheduledInterviews = data.map(interview => ({
            start: new Date(interview.datum_intervjua),
            end: addHours(new Date(interview.datum_intervjua), 1),
            title: `Interview with candidate ID: ${interview.kandidat_id}`,
            color: { primary: '#1e90ff', secondary: '#D1E8FF' }
          }));
          
          console.log("1",data)
        //console.log("1",interviewedUsernames)

         // Now get all candidates
         this.projectService.getAllCandidatesForInterviews(this.regruter_username).subscribe(allCandidates => {
         console.log(allCandidates);
         // Filter out those who already have scheduled interviews
         this.candidates = allCandidates.filter(candidate => 
             !scheduledInterviews.some(sched => 
                            sched.kandidat_username === candidate.username && 
                            sched.naziv_pozicije === candidate.naziv_pozicije
                             )
        
         );
         });
          

      });



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

      // Sačuvaj i za prikaz detalja ispod
      this.selectedDayInterviews = data;
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

/*
 scheduleInterview(candidate: any, interviewDateValue: string) {
  if (!interviewDateValue) {
    //alert('Molimo unesite datum i vreme intervjua prije zakazivanja.');
    return; // prekini funkciju ako nema datuma
  }

  const interviewDate = new Date(interviewDateValue);
  console.log(candidate, interviewDate);
  const interview = {
      naziv_pozicije: candidate.naziv_pozicije,   // you need to include this in your data model
      kandidat_username: candidate.username,
      regruter_username: this.regruter_username, // or fetch it from current user
      datum_intervjua: interviewDate
    };

    this.projectService.scheduleAnInterview(interview).subscribe(() => {
      this.ngOnInit();
    });

    console.log(interview);

}
*/
/*
scheduleInterview(candidate: any, dateValue: string, timeValue: string) {
  if (!dateValue || !timeValue) {
    alert('Molimo unesite datum i vreme intervjua prije zakazivanja.');
    return;
  }

  // Spoji datum i vreme u jedan ISO string
  const interviewDateTimeString = `${dateValue}T${timeValue}`;
  const interviewDate = new Date(interviewDateTimeString);

  console.log(candidate, interviewDate);
  const interview = {
      naziv_pozicije: candidate.naziv_pozicije,
      kandidat_username: candidate.username,
      regruter_username: this.regruter_username,
      datum_intervjua: interviewDate
    };

  this.projectService.scheduleAnInterview(interview).subscribe(() => {
    this.ngOnInit();
  });
s
  console.log(interview);
}


}*/


/*

import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ProjectService } from '../../services/services/project.service';
import { addHours, format } from 'date-fns';
import { ActivatedRoute } from '@angular/router';

import { AfterViewChecked ,AfterViewInit,ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-schedule-interviews',
  templateUrl: './schedule-interviews.component.html',
  styleUrls: ['./schedule-interviews.component.scss']
})
export class ScheduleInterviewsComponent implements OnInit {

  viewDate: Date = new Date();
  regruter_username = ""; // Ovo možeš menjati ili uzeti iz auth-a
  candidates: any[] = [];
  scheduledInterviews: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  selectedDayInterviews: any[] = [];
  selectedDateDisplay: string = '';
  candidateData:any = []

  role = ''; // new param for role ('user' or 'regruter')

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['username']){
        this.regruter_username = params['username'];
      }
       
      this.role = params['role'];  // get role from URL
      
      this.loadData();
    });
  }

  loadData(): void {
    this.projectService.getAllInterviewsByRegruterUsername(this.regruter_username).subscribe(data => {
      // Pripremi scheduledInterviews za kalendar
      this.scheduledInterviews = data.map(interview => ({
        start: new Date(interview.datum_intervjua),
        end: addHours(new Date(interview.datum_intervjua), 1),
        title: `Interview with candidate ID: ${interview.kandidat_id}`,
        color: { primary: '#1e90ff', secondary: '#D1E8FF' }
      }));

      // Lista kandidata koji još nisu zakazani za intervju
      const scheduledInterviewsUsernames = data.map(i => ({
        kandidat_username: i.usernameKandidata,
        naziv_pozicije: i.naziv_pozicije
      }));

      this.projectService.getAllCandidatesForInterviews(this.regruter_username).subscribe(allCandidates => {
        this.candidates = allCandidates.filter(candidate => 
          !scheduledInterviewsUsernames.some(sched =>
            sched.kandidat_username === candidate.username &&
            sched.naziv_pozicije === candidate.naziv_pozicije
          )
        );
      });
    });
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
    this.activeDayIsOpen = false;

    const formattedDate = format(date, 'yyyy-MM-dd');
    this.selectedDateDisplay = format(date, 'dd.MM.yyyy');

    this.projectService.getInterviewsByDate(this.regruter_username, formattedDate).subscribe(interviews => {
      this.selectedDayInterviews = interviews;

      // Samo prvo kandidata dohvatimo, i onda update-ujemo imena — ne čekamo sve
      interviews.forEach(interview => {
        this.projectService.getCandidateByUsername(interview.usernameKandidata).subscribe(candidate => {
          this.candidateData = candidate;
       
          interview.ime = this.candidateData.ime;
          interview.prezime = this.candidateData.prezime;
       
        });
      });
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

scheduleInterview(candidate: any, dateValue: string, timeValue: string) {
  if (!dateValue || !timeValue) {
    alert('Molimo unesite datum i vreme intervjua prije zakazivanja.');
    return;
  }

  // Spoji datum i vreme u jedan ISO string
  const interviewDateTimeString = `${dateValue}T${timeValue}`;
  const interviewDate = new Date(interviewDateTimeString);

  console.log(candidate, interviewDate);
  const interview = {
      naziv_pozicije: candidate.naziv_pozicije,
      kandidat_username: candidate.username,
      regruter_username: this.regruter_username,
      datum_intervjua: interviewDate
    };

  this.projectService.scheduleAnInterview(interview).subscribe(() => {
    this.ngOnInit();
  });

  console.log(interview);
}
 

/*
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  videoCallActive = false;
  localStream?: MediaStream;

ngAfterViewInit(): void {
  setTimeout(() => {
    if (this.localVideo && this.localVideo.nativeElement) {
      console.log('Video element is initialized.');
    } else {
      console.error('Video element is not initialized!');
    }
  }, 0); // Give Angular time to resolve the view and view child
}

private videoElementInitialized = false;

ngAfterViewChecked(): void {
  if (!this.videoElementInitialized && this.localVideo && this.localVideo.nativeElement) {
    console.log("Video element initialized after view checked.");
    this.videoElementInitialized = true;
  }
}

  startVideoCall(interview: any): void {
  if (this.localVideo && this.localVideo.nativeElement) {
    console.log('Starting video call...');
    this.videoCallActive = true;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        console.log('Media stream received:', stream);
        this.localStream = stream;
        this.localVideo.nativeElement.srcObject = stream;
      })
      .catch(err => {
        console.error('Error accessing camera/microphone:', err);
        alert('Ne mogu da pristupim kameri ili mikrofonu: ' + err.name);
        this.videoCallActive = false;
      });
  } else {
    console.error('Video element nije spreman!');
  }
}

 endVideoCall(): void {
  if (this.localStream) {
    this.localStream.getTracks().forEach(track => track.stop());
  }
  if (this.localVideo && this.localVideo.nativeElement) {
    this.localVideo.nativeElement.srcObject = null;  // Cleanup the video element
  }
  this.videoCallActive = false;
}*/


/*
  // New method to start video call
  startVideoCall(interview: any): void {
    const videoCallUrl = this.generateVideoCallLink(interview);

    // Open the video call URL in a new window or redirect
    window.open(videoCallUrl, '_blank');
  }*//*

startVideoCall(interview: any): void {
  const meetingLink = `https://zoom.us/j/${interview.kandidat_username}-${interview.naziv_pozicije}`;
  window.open(meetingLink, '_blank');  // Opens the link in a new tab
}

  // Method to generate video call link based on the interview data
  generateVideoCallLink(interview: any): string {
    // Example: You can create a custom video call URL or integrate with services like Jitsi, Zoom, etc.
    // For example, using Jitsi Meet:
    const roomName = `${interview.kandidat_username}-${interview.naziv_pozicije}`;
    return `https://meet.jit.si/${roomName}`;
  }






}*/























/*
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ProjectService } from '../../services/services/project.service';
import { addHours, format } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Define the expected response structure from Zoom API
interface ZoomMeetingResponse {
  join_url: string;
  id: number;
  topic: string;
  start_time: string;
}

@Component({
  selector: 'app-schedule-interviews',
  templateUrl: './schedule-interviews.component.html',
  styleUrls: ['./schedule-interviews.component.scss']
})
export class ScheduleInterviewsComponent implements OnInit {

  viewDate: Date = new Date();
  regruter_username = "";  // Replace with actual logged-in recruiter username
  candidates: any[] = [];
  scheduledInterviews: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  selectedDayInterviews: any[] = [];
  selectedDateDisplay: string = '';
  candidateData: any = [];

  role = ''; // For 'user' or 'regruter' roles

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient  // Add HttpClient to call Zoom API
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['username']){
        this.regruter_username = params['username'];
      }
      this.role = params['role'];  // Get role from URL
      this.loadData();
    });
  }

  loadData(): void {
    this.projectService.getAllInterviewsByRegruterUsername(this.regruter_username).subscribe(data => {
      // Preparing scheduled interviews for the calendar
      this.scheduledInterviews = data.map(interview => ({
        start: new Date(interview.datum_intervjua),
        end: addHours(new Date(interview.datum_intervjua), 1),
        title: `Interview with candidate ID: ${interview.kandidat_id}`,
        color: { primary: '#1e90ff', secondary: '#D1E8FF' }
      }));

      // List of candidates who are not scheduled yet
      const scheduledInterviewsUsernames = data.map(i => ({
        kandidat_username: i.usernameKandidata,
        naziv_pozicije: i.naziv_pozicije
      }));

      this.projectService.getAllCandidatesForInterviews(this.regruter_username).subscribe(allCandidates => {
        this.candidates = allCandidates.filter(candidate => 
          !scheduledInterviewsUsernames.some(sched =>
            sched.kandidat_username === candidate.username &&
            sched.naziv_pozicije === candidate.naziv_pozicije
          )
        );
      });
    });
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
      this.activeDayIsOpen = false;

      const formattedDate = format(date, 'yyyy-MM-dd');
      this.selectedDateDisplay = format(date, 'dd.MM.yyyy');

      this.projectService.getInterviewsByDate(this.regruter_username, formattedDate).subscribe(interviews => {
        this.selectedDayInterviews = interviews;

        interviews.forEach(interview => {
          this.projectService.getCandidateByUsername(interview.usernameKandidata).subscribe(candidate => {
            this.candidateData = candidate;
            interview.ime = this.candidateData.ime;
            interview.prezime = this.candidateData.prezime;
          });
        });
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

  // Method to schedule an interview
  scheduleInterview(candidate: any, dateValue: string, timeValue: string) {
    if (!dateValue || !timeValue) {
      alert('Molimo unesite datum i vreme intervjua prije zakazivanja.');
      return;
    }

    const interviewDateTimeString = `${dateValue}T${timeValue}`;
    const interviewDate = new Date(interviewDateTimeString);

    const interview = {
        naziv_pozicije: candidate.naziv_pozicije,
        kandidat_username: candidate.username,
        regruter_username: this.regruter_username,
        datum_intervjua: interviewDate
      };

    this.projectService.scheduleAnInterview(interview).subscribe(() => {
      this.ngOnInit();
    });

    console.log(interview);
  }

  // Create Zoom meeting link (this part requires Zoom API integration)
  startVideoCall(interview: any): void {
    this.createZoomMeeting(interview).then(meetingUrl => {
      window.open(meetingUrl, '_blank');  // Opens the valid Zoom meeting link in a new tab
    }).catch(error => {
      console.error('Error creating Zoom meeting:', error);
    });
  }

  // Function to create Zoom meeting using Zoom API
  createZoomMeeting(interview: any): Promise<string> {
    // Replace with your Zoom access token (OAuth/JWT)
    const accessToken = 'YOUR_ZOOM_ACCESS_TOKEN';

    // Zoom API URL for creating a meeting
    const apiUrl = `https://api.zoom.us/v2/users/me/meetings`;  // 'me' will use your logged-in Zoom account

    const data = {
      topic: `Interview with ${interview.kandidat_username}`,
      type: 2,  // Scheduled meeting
      start_time: new Date(interview.datum_intervjua).toISOString(),  // Convert interview date to ISO string
      duration: 30,  // Duration in minutes
      agenda: `Interview for the ${interview.naziv_pozicije} position`
    };

    return this.http.post<ZoomMeetingResponse>(apiUrl, data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }).toPromise().then(response => {
      if (response && response.join_url) {
        return response.join_url;  // Return the Zoom meeting join URL
      } else {
        throw new Error('Zoom meeting creation failed: join_url not found.');
      }
    });
  }
}*/




import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ProjectService } from '../../services/services/project.service';
import { addHours, format } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule-interviews',
  templateUrl: './schedule-interviews.component.html',
  styleUrls: ['./schedule-interviews.component.scss']
})
export class ScheduleInterviewsComponent implements OnInit {

  viewDate: Date = new Date();
  regruter_username = "";  // Replace with actual logged-in recruiter username
  candidates: any[] = [];
  scheduledInterviews: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  selectedDayInterviews: any[] = [];
  selectedDateDisplay: string = '';
  candidateData: any = [];

  role = ''; // For 'user' or 'regruter' roles

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient  // Add HttpClient to call Zoom API if needed
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['username']){
        this.regruter_username = params['username'];
      }
      this.role = params['role'];  // Get role from URL
      this.loadData();
    });
  }

  loadData(): void {
    this.projectService.getAllInterviewsByRegruterUsername(this.regruter_username).subscribe(data => {
      // Preparing scheduled interviews for the calendar
      this.scheduledInterviews = data.map(interview => ({
        start: new Date(interview.datum_intervjua),
        end: addHours(new Date(interview.datum_intervjua), 1),
        title: `Interview with candidate ID: ${interview.kandidat_id}`,
        color: { primary: '#1e90ff', secondary: '#D1E8FF' }
      }));

      // List of candidates who are not scheduled yet
      const scheduledInterviewsUsernames = data.map(i => ({
        kandidat_username: i.usernameKandidata,
        naziv_pozicije: i.naziv_pozicije
      }));

      this.projectService.getAllCandidatesForInterviews(this.regruter_username).subscribe(allCandidates => {
        this.candidates = allCandidates.filter(candidate => 
          !scheduledInterviewsUsernames.some(sched =>
            sched.kandidat_username === candidate.username &&
            sched.naziv_pozicije === candidate.naziv_pozicije
          )
        );
      });
    });
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
      this.activeDayIsOpen = false;

      const formattedDate = format(date, 'yyyy-MM-dd');
      this.selectedDateDisplay = format(date, 'dd.MM.yyyy');

      this.projectService.getInterviewsByDate(this.regruter_username, formattedDate).subscribe(interviews => {
        this.selectedDayInterviews = interviews;

        interviews.forEach(interview => {
          this.projectService.getCandidateByUsername(interview.usernameKandidata).subscribe(candidate => {
            this.candidateData = candidate;
            interview.ime = this.candidateData.ime;
            interview.prezime = this.candidateData.prezime;
          });
        });
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

  // Method to schedule an interview
  scheduleInterview(candidate: any, dateValue: string, timeValue: string) {
    if (!dateValue || !timeValue) {
      alert('Molimo unesite datum i vreme intervjua prije zakazivanja.');
      return;
    }

    const interviewDateTimeString = `${dateValue}T${timeValue}`;
    const interviewDate = new Date(interviewDateTimeString);

    const interview = {
        naziv_pozicije: candidate.naziv_pozicije,
        kandidat_username: candidate.username,
        regruter_username: this.regruter_username,
        datum_intervjua: interviewDate
      };

    this.projectService.scheduleAnInterview(interview).subscribe(() => {
      this.ngOnInit();
    });

    console.log(interview);
  }

  // Method to start a video call (with Jitsi Meet)
  /*startVideoCall(interview: any): void {
    // Generate a unique meeting room name using candidate username and position
    const roomName = `${interview.usernameKandidata}-${interview.naziv_pozicije}`;

    // Jitsi Meet URL format
    const meetingLink = `https://meet.jit.si/${roomName}?lang=en`;

    this.projectService.updateLink(meetingLink,interview.id).subscribe(data => {
          console.log(data);
    })

    

    // Open the meeting in a new tab
    //window.open(meetingLink, '_blank');
  }*/

   startVideoCall(interview: any): void {
    // Generate a unique meeting room name using candidate username, position, and a random large number
    const randomNum = Math.floor(Math.random() * 1000000); // Generates a random large number
    const roomName = `${interview.usernameKandidata}-${interview.naziv_pozicije}-${randomNum}`;

    // URL encode the room name to make it URL safe
    const encodedRoomName = encodeURIComponent(roomName);

    // Jitsi Meet URL format
    const meetingLink = `https://meet.jit.si/${encodedRoomName}?lang=en`;

    // Update the link in your database
    this.projectService.updateLink(meetingLink, interview.id).subscribe(data => {
        console.log(data);
    });

    // Open the meeting in a new tab
    window.open(meetingLink, '_blank');
} 


}