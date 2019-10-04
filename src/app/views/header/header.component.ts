import { Component, OnInit, OnDestroy, SystemJsNgModuleLoader } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private translate: TranslateService) {
      this.translate = translate;
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  clickLanguage(){
    console.log(this.translate.currentLang);
    if (this.translate.currentLang === 'en' || typeof this.translate.currentLang === 'undefined') {
      this.translate.use('fr');
    } else {
      this.translate.use('en');
    }
  }
}
