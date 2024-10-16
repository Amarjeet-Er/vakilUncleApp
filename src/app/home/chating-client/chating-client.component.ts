import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-chating-client',
  templateUrl: './chating-client.component.html',
  styleUrls: ['./chating-client.component.scss'],
})
export class ChatingClientComponent implements OnDestroy, OnInit {
  private ws: WebSocket | null = null;
  connectionStatus: string = 'Disconnected';
  chatMessages: Array<{ text: string; timestamp: string; sender: string }> = [];
  messageContent: string = '';

  senderId: any;
  receiverId: any;
  UserId: any;
  user_id: any;
  img_url: any;
  mrs: any;

  constructor(
    private _router: Router,
    private _shared: SharedService
  ) {
    this.UserId = localStorage.getItem('clientChat');
    this.user_id = JSON.parse(this.UserId);
    this.senderId = this.user_id?.SenderUserId;
    this.receiverId = this.user_id?.ReceiverUserId;

    this._shared.img_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    )
  }
  ngOnInit() {
    this.connectionStatus = 'Connecting...';
    const wsUrl = `wss://vakiluncle.in/api/chat?senderId=${this.senderId}&recieverId=${this.receiverId}&sendby=Client`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.connectionStatus = 'Connected';
        console.log('WebSocket connection established');
      };

      this.ws.onmessage = (event) => {
        console.log(event);
        
        try {
          const receivedData = event.data; 
          console.log('Receive', receivedData); 

          if (receivedData) {
            this.chatMessages.push({
              text: receivedData,
              timestamp:  new Date().toISOString(), 
              sender: 'other', 
            });
            this.autoScrollChat(); 
          } else {
            console.error('Received message format is incorrect:', receivedData);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
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
          sendBy: 'Client',
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
    localStorage.removeItem('clientChat');
    this._router.navigate(['/user/home/contact']);
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
