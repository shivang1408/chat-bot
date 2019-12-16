import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ChatDialogComponent } from './chat/chat-dialog/chat-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'chat-bot';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '350px', height: '600px', hasBackdrop: true, backdropClass: 'none'});
    }
}


