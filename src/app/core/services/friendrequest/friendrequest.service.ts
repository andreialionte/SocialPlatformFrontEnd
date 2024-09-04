import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FriendRequest } from '../../interfaces/FriendRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendrequestService {

  private readonly baseUrl: string = "https://localhost:7036/api/FriendRequest";

  constructor(private readonly httpClient: HttpClient) { }

  getFriendsReqByUserId(id: number): Observable<FriendRequest[]> {
    const url = `${this.baseUrl}/RetriveAllFriendRequests?id=${id}`;
    return this.httpClient.get<FriendRequest[]>(url);
  }

  sendFriendReqByIdAndUserId(id: number, usernameToAdd: string): Observable<FriendRequest> {
    let params = new HttpParams()
      .set('id', id.toString())
      .set('usernameToAdd', usernameToAdd);
    const url = `${this.baseUrl}/SendFriendRequest`;
    return this.httpClient.post<FriendRequest>(url, {}, { params });
  }

  acceptFriendReqBy(userId: number, usernameToAccept: string): Observable<FriendRequest[]> {
    let params = new HttpParams()
      .set("id", userId.toString())
      .set("usernameToAccept", usernameToAccept);
    const url = `${this.baseUrl}/AcceptFriendRequest`;
    return this.httpClient.post<FriendRequest[]>(url, {}, { params });
  }
}
