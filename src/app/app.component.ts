import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ChatDialogComponent } from './chat/chat-dialog/chat-dialog.component';
import { ChatService } from './chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'chat-bot';

  constructor(public dialog: MatDialog, private chat: ChatService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '350px', height: '600px', hasBackdrop: true, backdropClass: 'none'})
      .afterClosed().subscribe(res => {
          if (!this.chat.isClosed && !this.chat.isMinimize) {
            this.chat.isMinimize = true;
          }
      });
    }
}


