import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Friend } from '../../core/interfaces/Friend';
import { ChatMessageDto } from '../../core/interfaces/dtos/ChatMessageDto';
import { MessageService } from '../../core/services/message/message.service';
import { FriendsService } from '../../core/services/friends/friends.service';
//in frontend este ceva gresit
// id urile sunt luate gresit aici pe chat component de ex cand trb sa ia id 3 pentru friendid gen userId2 le ia gresit
// de ex: daca friend id e 2 real in backend la getUsers, frontend ul ia friendid (userId2) il ia 1 
// sau de ex daca friend id e 3 real in backend , frontend ul il ia 2 
// implementarea de la lista de prieteni cred ca este gresita deci da
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() friendId?: number;
  friendName?: string;
  newMessage: string = '';
  messages: { text: string, sender: string }[] = [];

  friends: Friend[] = [];
  messageArr: ChatMessageDto[] = [];

  constructor(
    private readonly msgService: MessageService,
    private readonly friendService: FriendsService
  ) {}

  ngOnInit() {
    this.loadFriends();
    this.loadChatHistory();
    // this.loadChatHistory();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['friendId']) {
      this.updateFriendName();
    }
    this.loadChatHistory();
  }

  private token = localStorage.getItem("token");
  private parts = this.token?.split(".");
  private payloadPart = this.parts?.[1];

  getUserIdByTheToken(): number | null {
    if (!this.token || !this.payloadPart) {
      return null;
    }
    const payload = JSON.parse(atob(this.payloadPart));
    return Number(payload.userId) || null;
  }

  loadFriends() {
    const userId = this.getUserIdByTheToken();
    if (userId !== null) {
      this.friendService.getFriendsByUserId(userId).subscribe(friends => {
        this.friends = friends;
        this.updateFriendName();
      });
    }
  }

  updateFriendName() {
    if (this.friendId !== undefined) {
      const friend = this.friends.find(f => f.id === this.friendId);
      this.friendName = friend ? friend.friendUser?.firstname : 'Friend';
    }
  }

  loadChatHistory() {
    const userId = this.getUserIdByTheToken();
    if (userId !== null && this.friendId !== undefined) {
      this.msgService.getHistoryMessages(userId, this.friendId).subscribe((data) => {
        this.messageArr = data;
        this.messages = this.messageArr.map(msg => ({
          text: msg.content || '',
          sender: msg.senderId === userId ? 'me' : 'friend'
        }));
      }, error => {
        console.error('Error loading chat history:', error);
      });
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.friendId !== undefined) {
      const senderId = this.getUserIdByTheToken();
      if (senderId !== null) {
        const chatMessage: ChatMessageDto = {
          senderId: senderId,
          receiverId: this.friendId,
          content: this.newMessage,
          timestamp: new Date(),
          channel: 'message'
        };
        this.msgService.sendMessage(chatMessage).subscribe(() => {
          this.newMessage = '';
          this.loadChatHistory(); // Load history after sending the message
        }, error => {
          console.error('Error sending message:', error);
        });
      } else {
        console.error('User ID does not exist');
      }
    }
  }
}
