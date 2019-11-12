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

@Component({
  selector: 'app-complete-studies-list',
  templateUrl: './complete.component.html',
  styleUrls: ['./studies.component.css']
})
export class CompleteStudiesComponent extends InitPageComponent
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
      return study.status === 1;
    });
    console.log(this.listOfStudies);

    this.listOfStudies = new MatTableDataSource(this.listOfStudies);
    this.listOfStudies.sort = this.sort;
    this.listOfStudies.paginator = this.paginator;
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

  loadEntry(study, index) {
    this.model = study;
    this.studyIndex = index;
    this.showDemo = true;
  }

  ngOnDestroy() {
    this.cdr.detach();
  }
}
