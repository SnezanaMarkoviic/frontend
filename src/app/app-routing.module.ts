import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/helpers/log-in/log-in.component';
import { HomeComponent } from './components/presentation/home/home.component';
import { SignUpComponent } from './components/helpers/sign-up/sign-up.component';
import { UserHomepageComponent } from './components/presentation/user-homepage/user-homepage.component';
import { AdminHomepageComponent } from './components/presentation/admin-homepage/admin-homepage.component';
import { EditAdvertisementsComponent } from './components/presentation/edit-advertisements/edit-advertisements.component';
import { authGuard } from './guards/auth.guard';
import { ApplyForAdvertisementComponent } from './components/presentation/apply-for-advertisement/apply-for-advertisement.component';
import { CandidateListComponent } from './components/presentation/candidate-list/candidate-list.component';
import { ApplicationsListComponent } from './components/presentation/applications-list/applications-list.component';
import { ExploreFeaturesComponent } from './components/presentation/explore-features/explore-features.component';
import { ScheduleInterviewsComponent } from './components/presentation/schedule-interviews/schedule-interviews.component';
import { InterviewsUserComponent } from './components/presentation/interviews-user/interviews-user.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'log-in', component:LogInComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'user-homepage/:username', component:UserHomepageComponent},
  {path: 'admin-homepage/:username', component:AdminHomepageComponent},
  {path: 'edit-form/:username', component:EditAdvertisementsComponent},
  {path: 'edit-form/:username/:id', component: EditAdvertisementsComponent},
  {path: 'apply-for-advertisement/:positionID/:username', component:ApplyForAdvertisementComponent},
  {path:'candidate-list/:id', component:CandidateListComponent},
  {path: 'see-your-applications-list/:username' , component:ApplicationsListComponent},
  {path: 'schedule-interviews/:username/:role',component:ScheduleInterviewsComponent},
  {path: 'explore-fearures',component:ExploreFeaturesComponent},
   {path: 'interviews-user/:username',component:InterviewsUserComponent},

/*  {
    path: 'log-in',
    loadComponent: () => import('./components/helpers/log-in/log-in.component').then(m => m.LogInComponent),
    canActivate: [authGuard], // blokiraj pristup ako je već ulogovan
    data: { tip: null } // bilo ko može, ali ako je već ulogovan preusmeri
  },
  {
    path: 'admin-homepage',
    loadComponent: () => import('./components/presentation/admin-homepage/admin-homepage.component').then(m => m.AdminHomepageComponent),
    canActivate: [authGuard],
    data: { tip: 'regruter' } // samo regruter
  },
  {
    path: 'user-homepage',
    loadComponent: () => import('./components/presentation/user-homepage/user-homepage.component').then(m => m.UserHomepageComponent),
    canActivate: [authGuard],
    data: { tip: 'kandidat' } // samo kandidat
  }*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
