import { Component, OnInit, OnDestroy, SystemJsNgModuleLoader } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InitPageComponent } from '../init-page.component';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent extends InitPageComponent implements OnInit, OnDestroy {
  constructor(
    private translate: TranslateService) {
      super();
      this.translate = translate;
      translate.setDefaultLang('en');
  }

  ngOnInit() {
    // this.selectedLanguage = 'en';
  }

  ngOnDestroy() {

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
}
