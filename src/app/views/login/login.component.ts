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

  usernameFormControl: any;

  registrationUsernameFormControl: any;

  passwordFormControl: any;

  registrationPasswordFormControl: any;

  confirmPasswordFormControl: any;

  roleFormControl: any;

  firstNameFormControl: any;

  lastNameFormControl: any;

  ageFormControl: any;

  sexFormControl: any;

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

  resetFieldErrors() {
    this.usernameFormControl = new FormControl('', [
      Validators.required
    ]);
  
    this.registrationUsernameFormControl = new FormControl('', [
      Validators.required
    ]);
  
    this.passwordFormControl = new FormControl('', [
      Validators.required
    ]);
  
    this.registrationPasswordFormControl = new FormControl('', [
      Validators.required
    ]);
  
    this.confirmPasswordFormControl = new FormControl('', [
      Validators.required
    ]);
  
    this.roleFormControl = new FormControl('', [
      Validators.required
    ]);
  
    this.firstNameFormControl = new FormControl('', [
      Validators.required
    ]);
  
    this.lastNameFormControl = new FormControl('', [
      Validators.required
    ]);
  
    this.ageFormControl = new FormControl('', [
      Validators.required
    ]);
  
    this.sexFormControl = new FormControl('', [
      Validators.required
    ]);
  }

  initializeOnLoad() {
    this.showRegisterForm = false;
    this.roles = [];
    this.sex = [];
    this.passwordMatches = true;
    this.userFound = true;
    this.resetFieldErrors();
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
    let sexCheck = false;
    if (this.model.sex || this.model.sex === 0) {
      sexCheck = true;
    }
    if (this.model.role === 0) {
      return !this.model.username
        || !this.model.password
        || !this.confirmationPassword
        || !this.model.firstName
        || !this.model.lastName
        || !this.model.age
        || !sexCheck
        ? false : true;
    } else if (this.model.role === 1) {
      return !this.model.username
        || !this.model.password
        || !this.confirmationPassword
        ? false : true;
    } else if (this.model.role === 2) {
      return !this.model.username
        || !this.model.password
        || !this.confirmationPassword
        || !this.model.firstName
        || !this.model.lastName
        || !this.model.age
        || !sexCheck
        ? false : true;
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
    this.confirmationPassword = '';
    this.showRegisterForm = true;
    this.resetFieldErrors();
  }

  close() {
    this.model = new User();
    this.confirmationPassword = '';
    this.showRegisterForm = false;
    this.resetFieldErrors();
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
