import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/helpers/header/header.component';
import { LogInComponent } from './components/helpers/log-in/log-in.component';
import { FooterComponent } from './components/helpers/footer/footer.component';
import { HomeComponent } from './components/presentation/home/home.component';
import { SignUpComponent } from './components/helpers/sign-up/sign-up.component';
import { UserHomepageComponent } from './components/presentation/user-homepage/user-homepage.component';
import { AdminHomepageComponent } from './components/presentation/admin-homepage/admin-homepage.component';
import { FormsModule } from '@angular/forms';
import { EditAdvertisementsComponent } from './components/presentation/edit-advertisements/edit-advertisements.component';
import { ApplyForAdvertisementComponent } from './components/presentation/apply-for-advertisement/apply-for-advertisement.component';
import { CandidateListComponent } from './components/presentation/candidate-list/candidate-list.component';
import { ApplicationsListComponent } from './components/presentation/applications-list/applications-list.component';
import { ExploreFeaturesComponent } from './components/presentation/explore-features/explore-features.component';
import { ScheduleInterviewsComponent } from './components/presentation/schedule-interviews/schedule-interviews.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterviewsUserComponent } from './components/presentation/interviews-user/interviews-user.component';
import { ChatBotComponent } from './components/helpers/chat-bot/chat-bot.component';

import { WitService } from './components/services/WitService'; 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    UserHomepageComponent,
    AdminHomepageComponent,
    EditAdvertisementsComponent,
    ApplyForAdvertisementComponent,
    CandidateListComponent,
    ApplicationsListComponent,
    ExploreFeaturesComponent,
    ScheduleInterviewsComponent,
    InterviewsUserComponent,
    ChatBotComponent,

    
  ],
  imports: [
     RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    BrowserModule,
    BrowserAnimationsModule, 

  ],
  providers: [WitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
