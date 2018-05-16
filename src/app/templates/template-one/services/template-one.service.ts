import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Message } from '../../models/message';

@Injectable()
export class TemplateOneService {

  private baseURL = 'https://api.dialogflow.com/v1/query?v=20150910';
  readonly token = environment.dialogflow.angularBot;
  public botAvatarUrl = '../../../../../assets/images/Motu.PNG';
  private userAvatarUrl = '../../../../../assets/images/user.png';

  conversation = new BehaviorSubject<Message[]>([]);
  constructor(private http: Http) {}

  converse(msg: string) {
    const userMessage = new Message(msg, 'user', this.userAvatarUrl, new Date());
    this.update(userMessage);
    const data = {
      query : msg,
      lang: 'en',
      sessionId: '12345'
    }
    const response = this.http.post(`${this.baseURL}`, data, {headers: this.getHeaders()})
             .map(res => {
               return res.json();
             });
    response.subscribe(res => {
      const botSpeech: string = res.result.fulfillment.speech;
      const botMessage = new Message(botSpeech, 'bot', this.botAvatarUrl , new Date());
      this.update(botMessage);
    });
  }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  public getHeaders(){
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
