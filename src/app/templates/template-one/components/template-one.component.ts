import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef  } from '@angular/core';
import { trigger, style, transition, animate, state, keyframes, query, stagger } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import { Message } from '../../models/message';
import { TemplateOneService } from '../services/template-one.service';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css'],
  animations: [
    trigger('chatBox', [
      state('inactive', style({
        height: '75px',
        borderRadius: '8px'
      })),
      state('active',   style({
        height: '500px'
      })),
      transition('inactive => active', animate('1ms')),
      transition('active => inactive', animate('1ms'))
    ]),
    trigger('chatBoxHeader', [
      state('inactive', style({
        height: '75px',
        borderRadius: '8px'
      })),
      state('active',   style({
        height: '75px'
      })),
      transition('inactive => active', animate('1ms')),
      transition('active => inactive', animate('1ms'))
    ]),
    trigger('chatBoxDisplay', [
      state('inactive', style({
        display: 'none'
      })),
      state('active',   style({
        display: 'block'
      })),
      transition('inactive => active', animate('200ms 2000ms')),
      transition('active => inactive', animate('200ms 2000ms'))
    ])
  ]
})
export class TemplateOneComponent implements OnInit, AfterViewChecked {

  messages: Observable<Message[]>;
  formValue: string;
  isPlusSign = true;
  isMinusSign = false;
  todayDate: Date = new Date();
  minOrMax = 'inactive';

  @ViewChild('chatList', { read: ElementRef }) chatList: ElementRef;

  constructor(public chat: TemplateOneService) {
    const motuBotMessage = 'Hello Friend !! Welcome to the world of  MOTU. I am here to help you on your life related problems';
    const botMessage = new Message(motuBotMessage, 'bot', chat.botAvatarUrl, new Date());
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

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }

  maximize() {
    this.isPlusSign = false;
    this.isMinusSign = true;
    this.minOrMax = 'active';
  }

  minimize() {
    this.isMinusSign = false;
    this.isPlusSign = true;
    this.minOrMax = 'inactive';
  }
}
