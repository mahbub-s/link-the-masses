import { Component, OnInit, OnDestroy, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaires.service';
import { Questionnaire } from 'src/app/models/questionnaire';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CodetableService } from 'src/app/services/codetable.service';
import { InitPageComponent } from '../init-page.component';

@Component ({
  selector: 'app-available-studiess-list',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})

export class AvailableStudiesComponent extends InitPageComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  displayedColumns = ['title', 'type', 'actions'];
  entryFlag: boolean;
  questionnaires: any;
  model: Questionnaire;
  editEntryFlag: boolean;
  studyTypes: any;
  showDemo: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private questionnaireService: QuestionnaireService,
    private cdr: ChangeDetectorRef,
    private codetableService: CodetableService
  ) {
    super();
  }

  ngOnInit() {
    this.initializeOnLoad();

    this.codetableService.getData().subscribe(res => {
        this.studyTypes = res[0]['studyTypes'];
      }
    );

    this.questionnaireService.getData().subscribe(res => {
      this.questionnaires = new MatTableDataSource(res);
      this.questionnaires.sort = this.sort;
      this.questionnaires.paginator = this.paginator;
    });

    console.log(this.loggedInUser);
  }

  initializeOnLoad() {
    this.questionnaires = [];
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

  addEntry() {
    this.model = new Questionnaire();
    this.entryFlag = true;
  }

  loadEntry(study) {
    this.model = study;
    this.showDemo = true;
  }

  editEntry(questionnaire) {
    this.model = questionnaire;
    this.editEntryFlag = true;
  }

  refreshData() {
    this.questionnaireService.getData().subscribe(res => {
      this.questionnaires = new MatTableDataSource(res);
      this.questionnaires.sort = this.sort;
      this.questionnaires.paginator = this.paginator;
    });
  }

  create() {
    console.log(this.model);
    this.questionnaireService.create(this.model).subscribe(
      res => {
        if (res.status === 201) {
          this.refreshData();
          this.close();
        }
      }
    );
  }

  edit(questionnaire) {
    console.log(questionnaire);

    const id = this.model._id;
    delete this.model._id;

    this.questionnaireService.update(this.model, id).subscribe(
      res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
        }
      }
    );
  }

  delete(questionnaire) {
    console.log(questionnaire);
    this.questionnaireService.delete(questionnaire._id).subscribe(
      res => {
        if (res.status === 200) {
          this.refreshData();
          this.close();
        }
      }
    );
  }

  ngOnDestroy() {
    this.cdr.detach();
  }
}
