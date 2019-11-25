import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';
import { InitPageComponent } from '../init-page.component';
import { AuthService } from 'src/app/auth/auth.service';
import { CodetableService } from 'src/app/services/codetable.service';
import { Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends InitPageComponent implements OnInit, OnDestroy, AfterViewChecked {
  username: string;
  password: string;
  confirmationPassword: string;
  users: any;
  model: User;
  showRegisterForm: boolean;
  showLoginForm: boolean;
  roles: any;
  sex: any;

  postalCode: string;
  streetAddress: string;
  province: string;
  country: string;
  city: string;

  passwordMatches: boolean;
  userFound: boolean;

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  registrationUsernameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  registrationPasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  roleFormControl = new FormControl('', [
    Validators.required
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  ageFormControl = new FormControl('', [
    Validators.required
  ]);

  sexFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

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
      this.sex = res[0]['sex'];
    });

    this.authService
      .getAuthStatusListener()
      .subscribe(res => {
        if (res === false) {
          this.userFound = false;
        } else {
          this.userFound = true;
        }
      });
  }

  initializeOnLoad() {
    this.showRegisterForm = false;
    this.roles = [];
    this.sex = [];
    this.passwordMatches = true;
    this.userFound = true;
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.cdr.detach();
  }

  loginValid() {
    return !this.username || !this.password ? false : true;
  }

  registrationValid() {
    if (this.model.role === 0) {
      return !this.username
        || !this.password
        || !this.confirmationPassword
        ? false : true;
    } else if (this.model.role === 1) {
      return !this.username || !this.password || !this.confirmationPassword ? false : true;
    } else if (this.model.role === 2) {
      return !this.username
        || !this.password
        || !this.confirmationPassword
        || !this.model.firstName
        || !this.model.lastName
        || !this.model.age
        || !this.model.sex
        ? false : true;
    } else {
      return false;
    }
  }

  login(loginUsername, loginPassword) {
    if (loginPassword !== undefined) {
      this.authService.login(loginUsername, loginPassword);
    }
  }

  loginForm() {
    this.showLoginForm = true;
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
    this.model.address = this.streetAddress + ' ' + this.city
      + ' ' + this.province + ' ' + this.country;
    if (this.model.password === this.confirmationPassword) {
      this.userService.create(this.model).subscribe(
        res => {
          if (res.status === 201) {
            this.close();
          }
        }
      );
    } else {
      this.passwordMatches = false;
    }
  }
}
