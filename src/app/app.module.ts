import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TemplateOneModule } from './templates/template-one/template-one.module';

import { AppComponent } from './app.component';
//import { TemplateOne } from './template-one/template-one.component';
//import { ChatListComponent } from './chat-list/chat-list.component';
//import { ChatItemComponent } from './chat-item/chat-item.component';
//import { ChatFormComponent } from './chat-form/chat-form.component';
//import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent
    //TemplateOne,
    //ChatListComponent,
    //ChatItemComponent,
    //ChatFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TemplateOneModule
  ],
  providers: [ ],//ChatService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
