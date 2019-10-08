import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InitPageComponent } from '../init-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent extends InitPageComponent implements OnInit, OnDestroy, AfterViewChecked {
  role: any;
  showTab: boolean;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef) {
      super();
      this.translate = translate;
      translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.initializeOnLoad();

    this.authService.loggedInStatus.subscribe(res => {
      this.showTab = res;
      if (localStorage.getItem('loggedInUser')) {
        this.role = this.loggedInUser.role;
      }
    });
  }

  initializeOnLoad() {
    this.role = null;
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
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
  }
}
