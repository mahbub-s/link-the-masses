import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewChecked,
    ChangeDetectorRef
  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CodetableService } from 'src/app/services/codetable.service';
import { InitPageComponent } from '../init-page.component';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Chat } from 'src/app/models/chat';
import { Response } from 'src/app/models/response';
import socketIOClient from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-researcher-chatlog-list',
    templateUrl: './chatlogview.component.html',
    styleUrls: ['./studies.component.css']
  })
  export class ChatLogViewComponent extends InitPageComponent
    implements OnInit, OnDestroy, AfterViewChecked {
    private socket = socketIOClient(environment.socketAPI);

    displayedColumns = ['title', 'type', 'participant', 'actions'];
    questionnaires: any;
    model: any;
    studyTypes: any;
    studyStatus: any;
    showDemo: boolean;
    listOfStudies: any;
    studyIndex: number;

    chatUsername: string;
    chatMessage: string;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
      private userService: UserService,
      private authService: AuthService,
      private cdr: ChangeDetectorRef,
      private codetableService: CodetableService
    ) {
      super();
    }

    ngOnInit() {
      this.initializeOnLoad();

      this.codetableService.getData().subscribe(res => {
        // tslint:disable-next-line: no-string-literal
        this.studyTypes = res[0]['studyTypes'];
        this.studyStatus = res[0]['studyStatus'];
      });

      this.userService.getParticipantChats(this.loggedInUser.username).subscribe(res => {
        for (const entry of res) {
          this.listOfStudies.push(entry.studies);
        }
        this.listOfStudies = new MatTableDataSource(this.listOfStudies);
        this.listOfStudies.sort = this.sort;
        this.listOfStudies.paginator = this.paginator;
      });

      this.socket.on('Chat updated', () => {
        this.userService.getParticipantChats(this.loggedInUser.username).subscribe(res => {
          this.listOfStudies = [];
          for (const entry of res) {
            this.listOfStudies.push(entry.studies);
          }
          this.model = this.listOfStudies[this.studyIndex];
          this.listOfStudies = new MatTableDataSource(this.listOfStudies);
          this.listOfStudies.sort = this.sort;
          this.listOfStudies.paginator = this.paginator;
        });
      });
    }

    initializeOnLoad() {
      this.listOfStudies = [];
      this.showDemo = false;
    }

    ngAfterViewChecked() {
      this.cdr.detectChanges();
    }

    close() {
      this.showDemo = false;
    }

    applyFilter(filterValue: string) {
      this.listOfStudies.filter = filterValue.trim().toLowerCase();
    }

    addChatResponse() {
      const pushResponse = new Response();
      pushResponse.username = this.loggedInUser.username;
      pushResponse.message = this.chatMessage;
      this.model.responses.push(pushResponse);
      this.chatUsername = this.loggedInUser.username;
      this.chatMessage = '';
    }

    addEntry() {
      this.model = { title: '', type: null };
    }

    loadEntry(study, index) {
      this.model = study;
      this.studyIndex = index;
      this.showDemo = true;
    }

    refreshData() {
      this.initializeOnLoad();

      this.userService.getParticipantChats(this.loggedInUser.username).subscribe(res => {
        this.listOfStudies = [];
        for (const entry of res) {
          this.listOfStudies.push(entry.studies);
        }
        this.listOfStudies = new MatTableDataSource(this.listOfStudies);
        this.listOfStudies.sort = this.sort;
        this.listOfStudies.paginator = this.paginator;
      });
    }

    enterResponse() {
      this.userService.updateParticipantStudy(this.model, this.model.participant).subscribe(res => {
        if (res.status === 200) {
          this.refreshData();
          this.showDemo = true;
        }
      });
    }

    ngOnDestroy() {
      this.cdr.detach();
    }
  }
