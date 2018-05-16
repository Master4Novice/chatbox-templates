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
    trigger('minOrMaxWindow', [
      state('inactive', style({
        borderRadius: '8px 8px 8px 8px',
        boxShadow: '0px 0px 10px 2px',
        width: '376px',
        position: 'fixed',
        float: 'right',
        bottom: '70px',
        right: '20px',
        backgroundColor: '#FFFFFF'
      })),
      state('active',   style({
        borderRadius: '8px 8px 8px 8px',
        boxShadow: '0px 0px 10px 2px',
        width: '376px',
        position: 'fixed',
        float: 'right',
        bottom: '70px',
        right: '20px',
        backgroundColor: '#FFFFFF',
        height: '500px'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
    trigger('minOrMaxBody', [
      state('inactive', style({
        marginLeft: '-15px',
        width: '376px',
        backgroundColor: '#363636',
        borderRadius: '8px 8px 8px 8px'
      })),
      state('active',   style({
        marginLeft: '-15px',
        width: '376px',
        backgroundColor: '#363636',
        borderRadius: '8px 8px 8px 8px',
        height: '500px'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
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
    const motuBotMessage = 'Hello Friends !! Welcome to the world of Motu. How may I help you ?';
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
    console.log('active');
  }

  minimize() {
    this.isMinusSign = false;
    this.isPlusSign = true;
    this.minOrMax = 'inactive';
    console.log('inactive');
  }
}
