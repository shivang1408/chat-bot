import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

// import { ApiAiClient } from 'api-ai-javascript';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { BehaviorSubject } from 'rxjs';

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string, public time: any) { }
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  welcomeText = this.client.textRequest('Welcome');

  chatHistory: Array<Message>;

  isMinimize: boolean;

  isClosed: boolean;

  constructor() {
    if (!this.chatHistory) {
      this.conversation = new BehaviorSubject<Message[]>([]);
      this.chatHistory = new Array<Message>();

    }
  }

  // Sends and receives messages via DialogFlow
  converse(msg: string, time: any) {
    if (msg !== 'Welcome') {
      const userMessage = new Message(msg, 'user', time);
      this.update(userMessage);
      this.chatHistory.push(userMessage);
    }

    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        const botMessage = new Message(speech, 'bot', time);
        this.update(botMessage);
        this.chatHistory.push(botMessage);
      });
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}
