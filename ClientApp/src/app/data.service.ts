import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private messageSource = new BehaviorSubject<string>('');
   currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message);
   // console.log('msg from service to console : ',message);
    return this.currentMessage;
  }
  getMessage(): Observable<any> {
    return this.messageSource.asObservable();
}
}
