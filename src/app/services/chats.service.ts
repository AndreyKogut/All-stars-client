import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { WebsocketService } from './websocket.service';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Chat } from '../interfaces';

const CHAT_URL = `${environment.rootUrl.replace(/^(https?)/, 'wss')}chats`;

@Injectable()
export class ChatsService {
  private chats: { [s: string]: Chat } = {};
  chatsSub = new Subject;
  messages: Subject<any>;

  constructor(
    private wsService: WebsocketService,
    private authService: AuthService,
  ) {
    this.messages = <Subject<any>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): any => JSON.parse(response.data));
  }

  toggleChatState(state: 'on' | 'off'): void {
    this.authService.sendRequest('put', `chat/${state}`)
      .subscribe((response: Response) => {
        const chat = response.json();

        this.chats = { ...this.chats, [chat._id]: chat };
        this.chatsSub.next(this.getChats());
      });
  }

  fetchChats() {
    this.authService.sendRequest('get', 'chats?skip=0&count=10')
      .subscribe((response: Response) => {
        const chats = response.json();
        this.chats = chats.reduce((sum, chat) => ({ ...sum, [chat._id]: chat }), {});

        this.chatsSub.next(this.getChats());
      });
  }

  fetchChat(id: string) {
    this.authService.sendRequest('get', `chats/${id}`)
      .subscribe((response: Response) => {
        const chat = response.json();
        this.chats[chat._id] = chat;

        this.chatsSub.next(this.getChats());
      });
  }

  updateChat(id: string, theme: string) {
    this.authService.sendRequest('post', `chat`, { theme })
      .subscribe(() => {
        this.setChatData(id, { theme });
        this.chatsSub.next(this.getChats());
      });
  }

  setChatData(id: string, data: Object): void {
    this.chats[id] = { ...this.chats[id], ...data };
  }

  getChats(): Chat[] {
    return Object.values(this.chats);
  }
}
