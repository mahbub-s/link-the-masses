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
  MatSelectModule
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
    MatSelectModule
  ]
})
export class AngularMaterialModule {}
