import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.less']
})
export class ChatsListComponent implements OnInit {
  chatName = '';

  constructor() { }

  ngOnInit() {
  }

  onCreateChat() {
    console.log(this.chatName);
  }
}
