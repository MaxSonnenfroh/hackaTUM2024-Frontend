import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://127.0.0.1:8000/ws');// Update URL as per your backend
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages() {
    console.log('getMessages triggered');
    return this.socket$; // Returns an observable for incoming messages
  }
}
