import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaires.service';
import { Questionnaire } from 'src/app/models/questionnaire';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component ({
  selector: 'app-available-studiess-list',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})

export class AvailableStudiesComponent implements OnInit, OnDestroy {
  displayedColumns = ['title', 'type', 'actions'];
  entryFlag: boolean;
  questionnaires: any;
  model: Questionnaire;
  editEntryFlag: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Remove later
  types: any[] = [
    {value: 0, viewValue: 'Questionnaire'},
    {value: 1, viewValue: 'Undefined'}
  ];

  constructor(
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit() {
    this.initializeOnLoad();

    this.questionnaireService.getData().subscribe(res => {
      this.questionnaires = new MatTableDataSource(res);
      this.questionnaires.sort = this.sort;
      this.questionnaires.paginator = this.paginator;
    });
  }

  initializeOnLoad() {
    this.questionnaires = [];
    this.entryFlag = false;
    this.editEntryFlag = false;
  }

  close() {
    this.model = new Questionnaire();
    this.entryFlag = false;
    this.editEntryFlag = false;
  }

  applyFilter(filterValue: string) {
    this.questionnaires.filter = filterValue.trim().toLowerCase();
  }

  addEntry() {
    this.model = new Questionnaire();
    this.entryFlag = true;
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

  }
}
