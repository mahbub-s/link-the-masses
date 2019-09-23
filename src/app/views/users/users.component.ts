import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component ({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns = ['username', 'role', 'actions'];
  entryFlag: boolean;
  users: any;
  model: User;
  editEntryFlag: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Remove later
  roles: any[] = [
    {value: 1, viewValue: 'Researcher'},
    {value: 2, viewValue: 'Participant'}
  ];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initializeOnLoad();

    this.userService.getData().subscribe(res => {
      this.users = new MatTableDataSource(res);
      this.users.sort = this.sort;
      this.users.paginator = this.paginator;
    });

    console.log("Billy's first commit");
  }

  initializeOnLoad() {
    this.users = [];
    this.entryFlag = false;
    this.editEntryFlag = false;
  }

  close() {
    this.model = new User();
    this.entryFlag = false;
    this.editEntryFlag = false;
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  addEntry() {
    this.model = new User();
    this.entryFlag = true;
  }

  editEntry(user) {
    this.model = user;
    this.editEntryFlag = true;
  }

  refreshData() {
    this.userService.getData().subscribe(res => {
      this.users = new MatTableDataSource(res);
      this.users.sort = this.sort;
      this.users.paginator = this.paginator;
    });
  }

  create() {
    console.log(this.model);
    this.userService.create(this.model).subscribe(
      res => {
        if (res.status === 201) {
          this.refreshData();
          this.close();
        }
      }
    );
  }

  edit(user) {
    console.log(user);

    const id = this.model._id;
    delete this.model._id;

    this.userService.update(this.model, id).subscribe(
      res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
        }
      }
    );
  }

  delete(user) {
    console.log(user);
    this.userService.delete(user._id).subscribe(
      res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
        }
      }
    );
  }

  ngOnDestroy() {

  }
}
