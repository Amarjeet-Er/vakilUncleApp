import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-chating-vakil',
  templateUrl: './chating-vakil.component.html',
  styleUrls: ['./chating-vakil.component.scss'],
})
export class ChatingVakilComponent implements OnInit {
  private ws: WebSocket | null = null;
  connectionStatus: string = 'Disconnected';
  chatMessages: Array<{ text: string; timestamp: string; sender: string }> = [];
  messageContent: string = '';

  senderId: any;
  receiverId: any;
  UserId: any;
  login: any;
  login_data: any;
  user_id: any;
  img_url: any;

  constructor(
    private _router: Router,
    private _shared: SharedService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this.UserId = localStorage.getItem('vakilChat');
    this.user_id = JSON.parse(this.UserId);
    this.senderId = this.login_data?.advId;
    this.receiverId = this.user_id?.ReceiverUserId;

    this._shared.img_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    )
  }

  ngOnInit() {
    this.connectionStatus = 'Connecting...';

    const wsUrl = `wss://vakiluncle.in/api/chat?senderId=${this.senderId}&recieverId=${this.receiverId}&sendby=Vakil`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.connectionStatus = 'Connected';
        console.log('WebSocket connection established');
      };

      this.ws.onmessage = (event) => {
        const receivedData = JSON.parse(event.data); // Assuming incoming messages are in JSON format
        this.chatMessages.push({
          text: receivedData.Message,
          timestamp: receivedData.MsgAt,
          sender: 'Vakil', // or 'me' depending on the sender
        });
        this.autoScrollChat();
      };

      this.ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        this.connectionStatus = 'Error connecting to WebSocket';
      };

      this.ws.onclose = () => {
        this.connectionStatus = 'Disconnected';
        console.log('WebSocket connection closed');
      };
    } catch (error) {
      console.error('Error establishing WebSocket connection:', error);
      this.connectionStatus = 'Failed to connect';
    }
  }

  sendMessage() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const trimmedMessage = this.messageContent.trim();
      if (trimmedMessage) {
        const chatMessage = {
          SenderUserId: this.senderId,
          ReceiverUserId: this.receiverId,
          Message: trimmedMessage,
          sendBy: 'Vakil',
          MsgAt: new Date().toISOString(),
        };

        try {
          this.ws.send(JSON.stringify(chatMessage));
          this.chatMessages.push({
            text: trimmedMessage,
            timestamp: chatMessage.MsgAt,
            sender: 'me', // Indicating the sender of the message
          });
          this.messageContent = ''; // Clear input after sending
          this.autoScrollChat();
        } catch (error) {
          console.error('Failed to send message:', error);
          this.connectionStatus = 'Error sending message';
        }
      } else {
        this.connectionStatus = 'Message cannot be empty';
      }
    } else {
      this.connectionStatus = 'Connection is closed';
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.connectionStatus = 'Disconnected';
    }
    localStorage.removeItem('vakilChat');
    this._router.navigate(['/vakil/home/contact'])
  }

  autoScrollChat() {
    const chatContainer = document.getElementById('chatMessages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
