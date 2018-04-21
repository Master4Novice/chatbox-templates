import { Component, OnInit } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatFormComponent } from '../chat-form/chat-form.component';
import { Message } from '../message';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css']
})
export class TemplateOneComponent implements OnInit {
  
  public message : Message;
  public messages : Message[];
  
  constructor() { 
    
  }

  ngOnInit() {
    this.message = new Message('','', '../assets/images/user.png');
    this.messages = [new Message('Welcome to chatbot universe','', '../assets/images/bot.png')];
  }

}
