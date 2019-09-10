import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import {MatTableDataSource} from '@angular/material/table';

@Component ({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns = ['username', 'role'];
  entryFlag: boolean;
  users: any;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initializeOnLoad();

    this.userService.getData().subscribe(res => {
      this.users = new MatTableDataSource(res);
    });
  }

  initializeOnLoad() {
    this.users = [];
    this.entryFlag = false;
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  addEntry() {
    this.entryFlag = true;
  }

  ngOnDestroy() {

  }
}
