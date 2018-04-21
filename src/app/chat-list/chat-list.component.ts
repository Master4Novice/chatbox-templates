import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Message } from '../message';
import { ChatItemComponent } from '../chat-item/chat-item.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, AfterViewInit {
  
  @Input('messages')
  private messages: Message[];
  
  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(ChatItemComponent, { read: ElementRef }) chatItems: QueryList<ChatItemComponent>;

  constructor() { }

  ngAfterViewInit() {
    this.chatItems.changes.subscribe(elements => {
      // console.log('messsage list changed: ' + this.messages.length);
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }
  
  ngOnInit() {
  }

}
