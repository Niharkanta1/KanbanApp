import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatToolbarModule } from '@angular/material';

const components = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatButtonToggleModule,
  MatListModule,
  MatTabsModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatRippleModule,
  MatDialogModule
]

@NgModule({
  imports: [components],
  exports: [components]
})
export class MaterialModule { }
