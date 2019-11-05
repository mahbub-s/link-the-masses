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
import { NgModel } from '@angular/forms';
import { Diary } from 'src/app/models/diary';

@Component({
  selector: 'app-available-studiess-list',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableStudiesComponent extends InitPageComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  displayedColumns = ['title', 'type', 'actions'];
  entryFlag: boolean;
  questionnaires: any;
  model: any;
  editEntryFlag: boolean;
  studyTypes: any;
  showDemo: boolean;
  listOfStudies: any;

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
    });

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

  initializeOnLoad() {
    this.questionnaires = [];
    this.listOfStudies = [];
    this.entryFlag = false;
    this.editEntryFlag = false;
    this.showDemo = false;
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  close() {
    this.model = new Questionnaire();
    this.entryFlag = false;
    this.editEntryFlag = false;
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
    this.entryFlag = true;
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

  loadEntry(study) {
    this.model = study;
    this.showDemo = true;
  }

  editEntry(study) {
    this.model = study;
    this.editEntryFlag = true;
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
    this.loggedInUser.studies.push(this.model);

    const id = this.loggedInUser._id;
    delete this.loggedInUser._id;

    this.userService.update(this.loggedInUser, id).subscribe(res => {
      if (res.status === 200) {
        this.refreshData();
        this.close();
        this.authService.login(
          this.loggedInUser.username,
          this.loggedInUser.password
        );
      }
    });
  }

  create() {
    this.model.researcher = this.loggedInUser.username;

    if (this.model.type === 0) {
      this.questionnaireService.create(this.model).subscribe(res => {
        if (res.status === 201) {
          this.refreshData();
          this.close();
        }
      });
    } else if (this.model.type === 2) {
      this.diaryService.create(this.model).subscribe(res => {
        if (res.status === 201) {
          this.refreshData();
          this.close();
        }
      });
    }
  }

  edit(study) {
    const id = this.model._id;
    delete this.model._id;

    if (this.model.type === 0) {
      this.questionnaireService.update(this.model, id).subscribe(res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
        }
      });
    } else if (this.model.type === 2) {
      this.diaryService.update(this.model, id).subscribe(res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
        }
      });
    }
  }

  delete(study) {
    if (study.type === 0) {
      this.questionnaireService.delete(study._id).subscribe(res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
        }
      });
    } else if (study.type === 2) {
      this.diaryService.delete(study._id).subscribe(res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
        }
      });
    }
  }

  ngOnDestroy() {
    this.cdr.detach();
  }
}
