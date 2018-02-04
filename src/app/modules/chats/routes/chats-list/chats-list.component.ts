import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService, ChatsService } from '../../../../services';
import { Chat, User } from '../../../../interfaces';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.less']
})
export class ChatsListComponent implements OnInit, OnDestroy {
  subs: Subscription[];
  chatName = this.getOwnChat().theme;
  chats: Chat[] = [];
  user: User;

  constructor(private chatsService: ChatsService, private authService: AuthService) { }

  ngOnInit() {
    this.chats = [];
    this.user = this.authService.user;

    this.chatsService.fetchChats();
    const chatsSub = this.chatsService.chatsSub.subscribe((chats: Chat[]) => {
      this.chats = chats;
    });

    const userSub = this.authService.currentUserSub.subscribe((user: User) => {
      this.user = user;
    });

    this.subs = [chatsSub, userSub];
  }

  onCreateChat() {
    this.chatsService.updateChat(this.getOwnChat()._id, this.chatName);
  }

  getOwnChat(): any {
    if (!this.user) {
      return {};
    }

    const userChat = this.chats.find((chat: Chat) => chat.owner === this.user._id);

    return userChat || {};
  }

  startChat() {
    this.chatsService.toggleChatState('on');
  }

  endChat() {
    this.chatsService.toggleChatState('off');
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
