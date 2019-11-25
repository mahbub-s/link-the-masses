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
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat';
import { Response } from 'src/app/models/response';
import { Diary } from 'src/app/models/diary';

@Component({
  selector: 'app-available-studies-list',
  templateUrl: './available.component.html',
  styleUrls: ['./studies.component.css']
})
export class AvailableStudiesComponent extends InitPageComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  displayedColumns = ['title', 'type', 'actions'];
  entryFlag: boolean;
  questionnaires: any;
  model: any;
  editEntryFlag: boolean;
  studyTypes: any;
  studyStatus: any;
  sex: any;
  displayStudy: boolean;
  listOfStudies: any;

  chatUsername: string;
  chatMessage: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private questionnaireService: QuestionnaireService,
    private diaryService: DiaryService,
    private userService: UserService,
    private chatService: ChatService,
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
      // tslint:disable-next-line: no-string-literal
      this.studyStatus = res[0]['studyStatus'];
      // tslint:disable-next-line: no-string-literal
      this.sex = res[0]['sex'];
    });

    const ids = [];
    for (const study of this.loggedInUser.studies) {
      ids.push(study._id);
    }

    if (this.loggedInUser.role === 2) {
      this.questionnaireService
        .getFilteredData(this.loggedInUser.age, this.loggedInUser.sex, ids)
        .subscribe(questionnaireRes => {
          if (questionnaireRes.length > 0) {
            for (const questionnaire of questionnaireRes) {
              this.listOfStudies.push(questionnaire);
            }
          }
          this.chatService
            .getFilteredData(this.loggedInUser.age, this.loggedInUser.sex, ids)
            .subscribe(chatRes => {
              if (chatRes.length > 0) {
                for (const chat of chatRes) {
                  this.listOfStudies.push(chat);
                }
              }
              this.diaryService
                .getFilteredData(this.loggedInUser.age, this.loggedInUser.sex, ids)
                .subscribe(diaryRes => {
                  if (diaryRes.length > 0) {
                    for (const diary of diaryRes) {
                      this.listOfStudies.push(diary);
                    }
                  }
                  this.listOfStudies = new MatTableDataSource(
                    this.listOfStudies
                  );
                  this.listOfStudies.sort = this.sort;
                  this.listOfStudies.paginator = this.paginator;
                });
            });
        });
    } else {
      this.questionnaireService.getData().subscribe(questionnaireRes => {
        if (questionnaireRes.length > 0) {
          for (const questionnaire of questionnaireRes) {
            this.listOfStudies.push(questionnaire);
          }
        }

        this.chatService.getData().subscribe(chatRes => {
          if (chatRes.length > 0) {
            for (const chat of chatRes) {
              this.listOfStudies.push(chat);
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
      });
    }
  }

  initializeOnLoad() {
    this.questionnaires = [];
    this.listOfStudies = [];
    this.entryFlag = false;
    this.editEntryFlag = false;
    this.displayStudy = false;
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  close() {
    this.model = new Questionnaire();
    this.entryFlag = false;
    this.editEntryFlag = false;
    this.displayStudy = false;
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

  removeQuestion(index) {
    this.model.questions.splice(1, index);
  }

  addEntry() {
    this.model = { title: '', type: null };
    this.entryFlag = true;
  }

  initializeStudyType(studyType) {
    const title = this.model.title;
    const upperAgeRange = this.model.upperAgeRange;
    const lowerAgeRange = this.model.lowerAgeRange;
    const sex = this.model.sex;
    if (studyType === 0) {
      this.model = new Questionnaire();
    } else if (studyType === 1) {
      this.model = new Chat();
    } else if (studyType === 2) {
      this.model = new Diary();
    }
    this.model.title = title;
    this.model.upperAgeRange = upperAgeRange;
    this.model.lowerAgeRange = lowerAgeRange;
    this.model.sex = sex;
  }

  loadEntry(study) {
    this.model = study;
    this.displayStudy = true;
  }

  editEntry(study) {
    this.model = study;
    this.editEntryFlag = true;
  }

  refreshData() {
    this.initializeOnLoad();

    const ids = [];
    for (const study of this.loggedInUser.studies) {
      ids.push(study._id);
    }

    if (this.loggedInUser.role === 2) {
      this.questionnaireService
        .getFilteredData(this.loggedInUser.age, this.loggedInUser.sex, ids)
        .subscribe(questionnaireRes => {
          if (questionnaireRes.length > 0) {
            for (const questionnaire of questionnaireRes) {
              this.listOfStudies.push(questionnaire);
            }
          }
          this.chatService
            .getFilteredData(this.loggedInUser.age, this.loggedInUser.sex, ids)
            .subscribe(chatRes => {
              if (chatRes.length > 0) {
                for (const chat of chatRes) {
                  this.listOfStudies.push(chat);
                }
              }
              this.diaryService
                .getFilteredData(this.loggedInUser.age, this.loggedInUser.sex, ids)
                .subscribe(diaryRes => {
                  if (diaryRes.length > 0) {
                    for (const diary of diaryRes) {
                      this.listOfStudies.push(diary);
                    }
                  }
                  this.listOfStudies = new MatTableDataSource(
                    this.listOfStudies
                  );
                  this.listOfStudies.sort = this.sort;
                  this.listOfStudies.paginator = this.paginator;
                });
            });
        });
    } else {
      this.questionnaireService.getData().subscribe(questionnaireRes => {
        if (questionnaireRes.length > 0) {
          for (const questionnaire of questionnaireRes) {
            this.listOfStudies.push(questionnaire);
          }
        }

        this.chatService.getData().subscribe(chatRes => {
          if (chatRes.length > 0) {
            for (const chat of chatRes) {
              this.listOfStudies.push(chat);
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
      });
    }
  }

  submitStudy() {
    if (!this.model.status) {
      this.model.status = 0;
    }
    this.loggedInUser.studies.push(this.model);

    const id = this.loggedInUser._id;
    // delete this.loggedInUser._id;

    this.userService.update(this.loggedInUser, id).subscribe(res => {
      if (res.status === 200) {
        this.refreshData();
        this.close();
        this.authService.updateToken(id);
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
    } else if (this.model.type === 1) {
      this.chatService.create(this.model).subscribe(res => {
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
    } else if (this.model.type === 1) {
      this.chatService.update(this.model, id).subscribe(res => {
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
    } else if (study.type === 1) {
      this.chatService.delete(study._id).subscribe(res => {
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
