import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InitPageComponent } from '../init-page.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent extends InitPageComponent implements OnInit, OnDestroy, AfterViewChecked {
  token: any;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef) {
      super();
      this.translate = translate;
      translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.initializeOnLoad();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if (this.userIsAuthenticated) {
          this.token = JSON.parse(this.authService.getToken());
        }
      });
  }

  initializeOnLoad() {
    
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  logout() {
    this.authService.logout();
  }

  clickLanguage() {
    if (this.translate.currentLang === 'en' || typeof this.translate.currentLang === 'undefined') {
      this.selectedLanguage = 'fr';
      this.translate.use(this.selectedLanguage);
    } else {
      this.selectedLanguage = 'en';
      this.translate.use(this.selectedLanguage);
    }
  }

  ngOnDestroy() {
    this.cdr.detach();
    this.authListenerSubs.unsubscribe();
  }
}
