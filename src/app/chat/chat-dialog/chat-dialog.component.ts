import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.less']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  time: any;
  @ViewChild('message', {static: true}) message: ElementRef<any>;

  constructor(public chat: ChatService, public dialog: MatDialog) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
    .pipe(scan((acc, val) => acc.concat(val)) );
    this.time =  Date.now();
    this.message.nativeElement.onfocus = true;
    this.chat.converse('Welcome', this.time);
  }

  sendMessage() {
    if (this.formValue.length > 0 && this.formValue.trim() !== '') {
    this.time =  Date.now();
    this.chat.converse(this.formValue, this.time);
    this.formValue = '';
  }
}

  close() {
    this.dialog.closeAll();
  }

  minimize() {

  }

}
