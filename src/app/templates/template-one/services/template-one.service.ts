import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Message } from '../../models/message';

@Injectable()
export class TemplateOneService {

  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  readonly token = environment.dialogflow.angularBot;

  conversation = new BehaviorSubject<Message[]>([]);
  constructor(private http: Http) { }

  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    let data = {
      query : msg,
      lang: 'en',
      sessionId: '12345'
    }
    return this.http.post(`${this.baseURL}`, data, {headers: this.getHeaders()})
        .map(res => {
          const speech = res.json();
          const botMessage = new Message(speech, 'bot');
          this.update(botMessage);
    });
  }
  
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  public getResponse(query: string){
    
  }

  public getHeaders(){
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
