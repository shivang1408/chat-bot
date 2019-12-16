import { Component, OnInit } from '@angular/core';
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

  constructor(public chat: ChatService, public dialog: MatDialog) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
    .pipe(scan((acc, val) => acc.concat(val)) );
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

  close() {
    this.dialog.closeAll();
  }

}
