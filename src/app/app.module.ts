import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { AngularMaterialModule } from './angular-material.module';
import { UsersComponent } from './views/users/users.component';
import { UserService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './views/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionnaireService } from './services/questionnaires.service';
import { DiaryService } from './services/diary.service';
import { ChatService } from './services/chat.service';
import { AvailableStudiesComponent } from './views/studies/available.component';
import { CodetableService } from './services/codetable.service';
import { FindValuePipe } from './pipes/findValue.pipe';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    ProfileComponent,
    AvailableStudiesComponent,
    FindValuePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [UserService, AuthService, QuestionnaireService, DiaryService, ChatService, CodetableService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
