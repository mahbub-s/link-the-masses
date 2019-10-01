
import {Component, OnInit, OnDestroy} from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  loginName = '';
  password = '';
  users: any;
  model: User;
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initializeOnLoad();

  }

  initializeOnLoad() {


  }

  ngOnDestroy() {

  }

  login(loginName) {
    console.log(loginName);
  //  console.log(this.userService.getData());
    this.userService.getData().subscribe(res => {
      console.log(res);
    });
  }


}
