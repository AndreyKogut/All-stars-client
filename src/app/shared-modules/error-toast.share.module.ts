import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../components/form-error/form-error.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FormErrorComponent],
  exports: [FormErrorComponent],
})
export class ErrorToastShareModule {}
