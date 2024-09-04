import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../../interfaces/dtos/ChatMessageDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private readonly httpClient:HttpClient) { }

  private baseUrl: string = "https://localhost:7036/api/";

  sendMessage(chatMessageDto: ChatMessageDto): Observable<ChatMessageDto>{
    return this.httpClient.post<ChatMessageDto>(this.baseUrl + 'Chat/SendMessage', chatMessageDto );
  }
  getHistoryMessages(userId: number, friendId: number): Observable<ChatMessageDto[]>{
    // const params = new HttpParams()
    // .set('userId', userId.toString())
    // .set('friendId', friendId.toString());
    // return this.httpClient.get<ChatMessageDto[]>(`${this.baseUrl}Chat/History`, { params });  //other variant to know
    return this.httpClient.get<ChatMessageDto[]>(`${this.baseUrl}Chat/GetHistory?userId1=${userId}&userId2=${friendId}`);
  }
}