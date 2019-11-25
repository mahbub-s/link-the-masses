import { Component, OnInit, OnDestroy } from '@angular/core';
import { InitPageComponent } from '../init-page.component';
import { CodetableService } from 'src/app/services/codetable.service';

@Component ({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent extends InitPageComponent
  implements OnInit, OnDestroy {
  roles: any;
  sex: any;
  studyTypes: any;

  constructor(
    private codetableService: CodetableService
  ) {
    super();
  }

  ngOnInit() {
    this.initializeOnLoad();

    this.codetableService.getData().subscribe(res => {
        this.roles = res[0]['roles'];
        this.sex = res[0]['sex'];
        this.studyTypes = res[0]['studyTypes'];
      }
    );
  }

  initializeOnLoad() {
    this.roles = [];
    this.sex = [];
    this.studyTypes = [];
  }

  getStaticMap(address: string): string {
    address = address.replace(/\s/g, '').replace(/\./g, '').replace(/\,/g, '');

    const URLP1 = 'https://maps.googleapis.com/maps/api/staticmap?center=';
    const URLP2 = '&size=600x200&zoom=12&markers=size:mid%7Ccolor:red%7C';
    const URLP3 = '&key=AIzaSyA5ob8CsoU0t3h_jkAdAkUN9HnHRG0ZVzA';

    return URLP1 + address + URLP2 + address + URLP3;
  }

  ngOnDestroy() {

  }
}
