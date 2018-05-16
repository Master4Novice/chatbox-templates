import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateOneComponent } from './components/template-one.component';
import { TemplateOneService } from './services/template-one.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [TemplateOneComponent],
  declarations: [TemplateOneComponent],
  providers: [TemplateOneService]
})
export class TemplateOneModule { }
