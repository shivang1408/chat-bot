import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

// import { ApiAiClient } from 'api-ai-javascript';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { BehaviorSubject } from 'rxjs';

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string, public time: any) {}
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);
  currentTime = new BehaviorSubject<Message[]>([]);

  constructor() {}

  // Sends and receives messages via DialogFlow
  converse(msg: string, time: any) {
    const userMessage = new Message(msg, 'user', time);
    this.update(userMessage);

    return this.client.textRequest(msg)
               .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot', time);
                  this.update(botMessage);
               });
  }



  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}
