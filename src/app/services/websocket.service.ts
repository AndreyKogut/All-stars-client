import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  constructor() { }

  private subject: Rx.Subject<MessageEvent>;

  private create(url): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);

        return ws.close.bind(ws);
      });

    return Rx.Subject.create(null, observable);
  }

  connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }

    return this.subject;
  }
}
