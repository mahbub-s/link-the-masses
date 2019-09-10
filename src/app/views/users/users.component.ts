import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';

@Component ({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns = ['username', 'role'];
  users: User[];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.users = [];

    this.userService.getData().subscribe(res => {
      this.users = res;
    });
  }

  ngOnDestroy() {

  }
}
