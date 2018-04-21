import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  
  @Input('message')
  private message : Message;

  @Input('messages')
  private messages : Message[];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  public sendMessage(): void {
    
    this.messages.push(this.message);

    this.chatService.getResponse(this.message.content).subscribe(res => {
      this.messages.push(
        new Message(res.result.fulfillment.speech,'', 'assets/images/bot.png')
      );
    });

    this.message = new Message('','', 'assets/images/user.png');
  }

  public sendMessageKey($event): void {
    
    var keyCode = $event.which || $event.keyCode;
    if (keyCode === 13) {
        
      this.messages.push(this.message);
  
      this.chatService.getResponse(this.message.content).subscribe(res => {
        this.messages.push(
          new Message(res.result.fulfillment.speech, '','assets/images/bot.png')
        );
      });
  
      this.message = new Message('', '','assets/images/user.png');
    }
  }

}
