
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UpdateMessage } from '../types/UpdateMessage';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSource = new BehaviorSubject<UpdateMessage | undefined>(undefined);
  currentMessage = this.messageSource.asObservable();

  updateMessage(message: UpdateMessage) {
    this.messageSource.next(message);
  }
}
