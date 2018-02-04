import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChatsService } from '../../../../services';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../../../../interfaces';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit, OnDestroy {
  subs: Subscription[];
  chatId: string;
  chat: Chat;

  constructor(private chatsService: ChatsService, private route: ActivatedRoute) { }

  ngOnInit() {
    const paramsSub = this.route.params.subscribe(({ id }) => {
      this.chatId = id;
    });

    const chatsSub = this.chatsService.chatsSub.subscribe((chats: Chat[]) => {
      this.chatsService.fetchChat(this.chatId);
      this.chat = chats.find((chat: Chat) => chat._id === this.chatId);
    });

    this.subs = [paramsSub, chatsSub];
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
