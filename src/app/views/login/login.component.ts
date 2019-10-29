import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';
import { InitPageComponent } from '../init-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { CodetableService } from 'src/app/services/codetable.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends InitPageComponent implements OnInit, OnDestroy, AfterViewChecked {
  username: string;
  password: string;
  users: any;
  model: User;
  showRegisterForm: boolean;
  roles: any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private codetableService: CodetableService,
    private router: Router,
    private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.initializeOnLoad();

    this.codetableService.getData().subscribe(res => {
      this.roles = res[0]['roles'];
    });
  }

  initializeOnLoad() {
    this.showRegisterForm = false;
    this.roles = [];
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.cdr.detach();
  }

  login(loginUsername, loginPassword) {
    this.authService.login(loginUsername, loginPassword).subscribe(res => {
      this.router.navigate(['profile']);
    });
  }

  register() {
    this.model = new User();
    this.showRegisterForm = true;
  }

  close() {
    this.model = new User();
    this.showRegisterForm = false;
  }

  create() {
    this.userService.create(this.model).subscribe(
      res => {
        if (res.status === 201) {
          this.close();
        }
      }
    );
  }
}
