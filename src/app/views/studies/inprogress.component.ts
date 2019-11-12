import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewChecked,
    ChangeDetectorRef
  } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaires.service';
import { Questionnaire } from 'src/app/models/questionnaire';
import { Question } from 'src/app/models/question';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CodetableService } from 'src/app/services/codetable.service';
import { InitPageComponent } from '../init-page.component';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Entry } from 'src/app/models/entry';
import { DiaryService } from 'src/app/services/diary.service';
import { Diary } from 'src/app/models/diary';

@Component({
    selector: 'app-inprogress-studies-list',
    templateUrl: './inprogress.component.html',
    styleUrls: ['./studies.component.css']
  })
  export class InprogressStudiesComponent extends InitPageComponent
    implements OnInit, OnDestroy, AfterViewChecked {
    displayedColumns = ['title', 'type', 'actions'];
    questionnaires: any;
    model: any;
    studyTypes: any;
    studyStatus: any;
    showDemo: boolean;
    listOfStudies: any;
    studyIndex: any;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
      private questionnaireService: QuestionnaireService,
      private diaryService: DiaryService,
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

      this.listOfStudies = this.loggedInUser.studies.filter(study => {
        return study.status === 0;
      });
      console.log(this.listOfStudies);

      this.listOfStudies = new MatTableDataSource(this.listOfStudies);
      this.listOfStudies.sort = this.sort;
      this.listOfStudies.paginator = this.paginator;
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
      this.questionnaires.filter = filterValue.trim().toLowerCase();
    }

    addQuestion() {
      const question = new Question();
      this.model.questions.push(question);
    }

    addDiaryEntry() {
      const diaryEntry = new Entry();
      this.model.entries.push(diaryEntry);
    }

    removeQuestion(index) {
      this.model.questions.splice(1, index);
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

      this.questionnaireService.getData().subscribe(questionnaireRes => {
        if (questionnaireRes.length > 0) {
          for (const questionnaire of questionnaireRes) {
            this.listOfStudies.push(questionnaire);
          }
        }

        this.diaryService.getData().subscribe(diaryRes => {
          if (diaryRes.length > 0) {
            for (const diary of diaryRes) {
              this.listOfStudies.push(diary);
            }
          }

          this.listOfStudies = new MatTableDataSource(this.listOfStudies);
          this.listOfStudies.sort = this.sort;
          this.listOfStudies.paginator = this.paginator;
        });
      });
    }

    submitStudy() {
      this.loggedInUser.studies.splice(this.studyIndex, 1, this.model);

      const id = this.loggedInUser._id;
      delete this.loggedInUser._id;

      this.userService.update(this.loggedInUser, id).subscribe(res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
          this.authService.updateToken(id);
        }
      });
    }

    ngOnDestroy() {
      this.cdr.detach();
    }
  }
