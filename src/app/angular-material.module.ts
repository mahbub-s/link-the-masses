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
  MatSortModule
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
    MatSortModule
  ]
})
export class AngularMaterialModule {}
