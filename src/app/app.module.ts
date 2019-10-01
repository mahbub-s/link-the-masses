import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './views/header/header.component';
import { AngularMaterialModule } from './angular-material.module';
import { UsersComponent } from './views/users/users.component';
import { UserService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './views/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { QuestionnaireService } from './services/questionnaires.service';
import { DiaryService } from './services/diary.service';
import { ChatService } from './services/chat.service';
import { AvailableStudiesComponent } from './views/studies/available.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    ProfileComponent,
    AvailableStudiesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [UserService, QuestionnaireService, DiaryService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
