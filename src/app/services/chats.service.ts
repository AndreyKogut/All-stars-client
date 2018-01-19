import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { WebsocketService } from './websocket.service';
import { environment } from '../../environments/environment';

const CHAT_URL = `${environment.rootUrl.replace(/^(https?)/, 'wss')}chats`;

@Injectable()
export class ChatsService {
  public messages: Subject<any>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): any => JSON.parse(response.data));
  }
}
