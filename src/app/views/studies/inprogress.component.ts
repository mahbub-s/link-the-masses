import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewChecked,
    ChangeDetectorRef
  } from '@angular/core';
import { Questionnaire } from 'src/app/models/questionnaire';
import { Question } from 'src/app/models/question';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CodetableService } from 'src/app/services/codetable.service';
import { InitPageComponent } from '../init-page.component';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Chat } from 'src/app/models/chat';
import { Response } from 'src/app/models/response';
import { Entry } from 'src/app/models/entry';
import { Diary } from 'src/app/models/diary';
import socketIOClient from 'socket.io-client';

@Component({
    selector: 'app-inprogress-studies-list',
    templateUrl: './inprogress.component.html',
    styleUrls: ['./studies.component.css']
  })
  export class InprogressStudiesComponent extends InitPageComponent
    implements OnInit, OnDestroy, AfterViewChecked {
    private socket = socketIOClient('http://localhost:3001/');

    displayedColumns = ['title', 'type', 'actions'];
    questionnaires: any;
    model: any;
    studyTypes: any;
    studyStatus: any;
    showDemo: boolean;
    listOfStudies: any;
    studyIndex: any;

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

      this.socket.on('Chat updated', () => {
        this.userService.getParticipantData(this.loggedInUser._id).subscribe(res => {
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

      this.userService.getParticipantData(this.loggedInUser._id).subscribe(res => {
        for (const entry of res) {
          this.listOfStudies.push(entry.studies);
        }
        this.listOfStudies = new MatTableDataSource(this.listOfStudies);
        this.listOfStudies.sort = this.sort;
        this.listOfStudies.paginator = this.paginator;
      });
    }

    initializeOnLoad() {
      this.questionnaires = [];
      this.listOfStudies = [];
      this.showDemo = false;
    }

    ngAfterViewChecked() {
      this.cdr.detectChanges();
    }

    close() {
      this.model = new Questionnaire();
      this.showDemo = false;
    }

    applyFilter(filterValue: string) {
      this.listOfStudies.filter = filterValue.trim().toLowerCase();
    }

    addQuestion() {
      const question = new Question();
      this.model.questions.push(question);
    }

    addDiaryEntry() {
      const diaryEntry = new Entry();
      this.model.entries.push(diaryEntry);
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

    initializeStudyType(studyType) {
      const title = this.model.title;
      if (studyType === 0) {
        this.model = new Questionnaire();
      } else if (studyType === 2) {
        this.model = new Diary();
      }
      this.model.title = title;
    }

    loadEntry(study, index) {
      this.model = study;
      this.studyIndex = index;
      this.showDemo = true;
    }

    refreshData() {
      this.initializeOnLoad();

      this.userService.getParticipantData(this.loggedInUser._id).subscribe(res => {
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
      this.userService.updateParticipantStudy(this.model, this.loggedInUser.username).subscribe(res => {
        if (res.status === 200) {
          this.refreshData();
          this.showDemo = true;
        }
      });
    }

    submitStudy() {
      this.userService.updateParticipantStudy(this.model, this.loggedInUser.username).subscribe(res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
          this.authService.updateToken(this.loggedInUser._id);
        }
      });
    }

    ngOnDestroy() {
      this.cdr.detach();
    }
  }