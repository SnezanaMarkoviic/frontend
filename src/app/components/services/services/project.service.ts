import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../../helpers/log-in/log-in.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectService{

  apiURL = `${environment.API_URL}/positions`;
  
  constructor(private http: HttpClient){}

  getAllPositions(){
    return this.http.get(this.apiURL);
  }
   
  getPositionByID(positionID:any){
    return this.http.get(`${this.apiURL}/${positionID}`);
  }
  
  addProject(position:any){
    return this.http.post(this.apiURL,position);
  }
  
  updatePosition(positionID:any, position:any){
    return this.http.put(`${this.apiURL}/${positionID}`,position);
  }


  deletePosition(positionID: any){
     return this.http.delete(`${this.apiURL}/${positionID}`);
  }

  getAllCandiatesByPositionID(positionID: any){
    return this.http.get(`${this.apiURL}/all-candidates/${positionID}`);
  }
  
  getAllPositionsOfOneFirmByID(firmaID:any){
    return this.http.get(`${this.apiURL}/all-positions/${firmaID}`);
  }
  
  getRegruterByUsername(username:any){
    return this.http.get(`${environment.API_URL}/regruteri/${username}`);
  }

  getAllPositionsOfOneCandidateByUsername(username:any){
    return this.http.get(`${this.apiURL}/all-candidate-positions/${username}`);
  }


  getAllNewPositionsForCandidate(username:any){
    return this.http.get(`${this.apiURL}/all-positions-to-apply-to/${username}`);
  }

  getApplicationByID(positionID:any, candidateID:any){
    return this.http.get(`${environment.API_URL}/application/${positionID}/${candidateID}`);
  }

  updateApplicationByID(applicationID:any, application:any){
     return this.http.put(`${environment.API_URL}/application/${applicationID}`,application);
  }

  insertUser(user:any){
    return this.http.post(environment.API_URL,user);
  }

  insertApplication(application:any){
    return this.http.post(`${environment.API_URL}/application`,application);
  }

  getCandidateByUsername(username:any){
    return this.http.get(`${environment.API_URL}/candidates/${username}`);
  }

  updateCandidateByID(candidateID:any, candidate:any){
     return this.http.put(`${environment.API_URL}/candidates/${candidateID}`,candidate);
  }

  insertCandidate(candidate:any){
    return this.http.post(`${environment.API_URL}/candidates`,candidate);
  }

  scheduleAnInterview(interview:any){
    return this.http.post(`${environment.API_URL}/regruteri/schedule-an-inteview`,interview);
  }
/*  getAllCandidatesForInterviews(regruter_username:any){
    return this.http.get(`${environment.API_URL}/regruteri/get-candidates-for-interviews/${regruter_username}`);
  }*/
 getAllCandidatesForInterviews(regruter_username: string): Observable<any[]> {
  return this.http.get<any[]>(`${environment.API_URL}/regruteri/get-candidates-for-interviews/${regruter_username}`);
 }

  getRegruterByUsername2(username:string): Observable<any[]>{
    return this.http.get<any[]>(`${environment.API_URL}/regruteri/${username}`);
  }
  /*getAllInterviewsByRegruterUsername(regruter_username:any){
      return this.http.get(`${environment.API_URL}/regruteri/get-interviews-by-regruter_username/${regruter_username}`);
  }*/
 getAllInterviewsByRegruterUsername(regruter_username: string): Observable<any[]> {
  return this.http.get<any[]>(`${environment.API_URL}/regruteri/get-interviews-by-regruter_username/${regruter_username}`);
}
 
 /*getInterviewsByDate(regruter_username: string,datum:any){
  return this.http.get<any[]>(`${environment.API_URL}/regruteri/get-interviews-by-date/${regruter_username}/${datum}`);
 }*/

  getInterviewsByDate(regruter_username: string, datum: string) {
  const url = `${environment.API_URL}/regruteri/get-interviews-by-date/${regruter_username}/${datum}`;
  console.log('GET URL:', url);
  return this.http.get<any[]>(url);
}

  /*getAllInterviewsByCandidateUsername(candidate_username:any){
    return this.http.get(`${environment.API_URL}/regruteri/get-interviews-by-candidate_username/${candidate_username}`);
  }*/

  getAllInterviewsByCandidateUsername(candidate_username: string):Observable<any[]>{
  return this.http.get<any[]>(`${environment.API_URL}/regruteri/get-interviews-by-candidate_username/${candidate_username}`);
 }  
/*
 updateLink(link:any,interviewID:any){
   return this.http.put(`${environment.API_URL}/regruteri/update-link/${link}/${interviewID}`,{});
 }*/

updateLink(link: string, interviewID: number) {
   // Construct the URL for the PUT request
   const url = `${environment.API_URL}/regruteri/update-link/${interviewID}`;

   // Send the PUT request with the `link` in the body
   return this.http.put(url, link);
}

 /*  updateLink(link: any, interviewID: any) {
   // URL encode the link
   const encodedLink = encodeURIComponent(link);

   return this.http.put(`${environment.API_URL}/regruteri/update-link/${encodedLink}/${interviewID}`, {});
}*/


  /*getLogInData(username:any){
    return this.http.get(`${environment.API_URL}/${username}`);
  }*/
   

     getLogInData(username: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/${username}`);
  }

  getUserData(username: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/${username}`);
  }



 /* getAllCandidates(){
   //return this.http.get("http://localhost:8080/api/project")
//   return this.http.get(`${this.apiURL}/kandidati`)
  }*/ 
   

  /*
  addProject(project:any){
    //return this.http.post("http://localhost:8080/api/project/",project);
    return this.http.post(this.apiURL,project);
  }
  
  getProjectByID(projectID:any){
    return this.http.get(`${this.apiURL}/${projectID}`);
  }

  updateProject(projectID:any, project:any){
    return this.http.put(`${this.apiURL}/${projectID}`,project);
  }

  deleteProject(projectID : any){
     return this.http.delete(`${this.apiURL}/${projectID}`);
  }
*/

}
 