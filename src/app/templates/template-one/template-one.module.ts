import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TemplateOneComponent } from './components/template-one.component';
import { TemplateOneService } from './services/template-one.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: [TemplateOneComponent],
  declarations: [TemplateOneComponent],
  providers: [TemplateOneService]
})
export class TemplateOneModule { }
