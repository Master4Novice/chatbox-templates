import { Component, OnInit,AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import { Message } from '../../models/message';
import { TemplateOneService } from '../services/template-one.service';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css']
})
export class TemplateOneComponent implements OnInit, AfterViewInit {
  
  messages: Observable<Message[]>;
  formValue: string;
  isPlusSign: boolean = false;
  isMinusSign: boolean = true;
  todayDate: Date = new Date();

  @ViewChild('chatList', { read: ElementRef }) chatList: ElementRef;

  constructor(public chat: TemplateOneService) { 
    const motuBotMessage: string = 'Hello Friends !! Welcome to the world of Motu. How may I help you ?';
    const botMessage = new Message(motuBotMessage, 'bot',chat.botAvatarUrl, new Date());
    chat.update(botMessage);
  }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      console.log('That');
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }

}
