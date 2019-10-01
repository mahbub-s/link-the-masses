
import {Component, OnInit, OnDestroy} from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  username: string;
  password: string;
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

  login(loginUsername, loginPassword) {
    this.userService.validate(loginUsername, loginPassword).subscribe( res => {
      console.log(res);
    }
  );

  //   console.log(loginName);
  // //  console.log(this.userService.getData());
  //   this.userService.getData().subscribe(res => {
  //     console.log(res);
  //     this.users = res;
  //     const user = this.users.filter(data => data.username === loginName);
  //     console.log(user);
  //     if (user.length === 0) {
  //       console.log('404');
  //     } else {
  //       console.log('valid');
  //     }
  //   });

  }


}
