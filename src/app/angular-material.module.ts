import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatDividerModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatSelectModule,
  MatSortModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  // Auto imports
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule
  ]
})
export class AngularMaterialModule {}
