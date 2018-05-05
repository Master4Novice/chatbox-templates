import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import { Message } from '../../models/message';
import { TemplateOneService } from '../services/template-one.service';

@Component({
  selector: 'app-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.css']
})
export class TemplateOneComponent implements OnInit {
  
  messages: Observable<Message[]>;
  formValue: string;
  isPlusSign: boolean = false;
  isMinusSign: boolean = true;

  constructor(public chat: TemplateOneService) { }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
