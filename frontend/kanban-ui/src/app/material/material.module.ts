import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';

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
  MatListModule
]

@NgModule({
  imports: [components],
  exports: [components]
})
export class MaterialModule { }
