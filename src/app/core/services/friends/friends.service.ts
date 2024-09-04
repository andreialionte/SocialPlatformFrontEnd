import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from '../../interfaces/Friend';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  /**
   *
   */
  constructor(private readonly http: HttpClient) {
    
  }

  getFriendsByUserId(id: number): Observable<Friend[]> {
    var req = this.http.get<Friend[]>(`https://localhost:7036/api/Friends/GetFriend/${id}`);
    return req;
  }

  // private mockFriends: Friend[] = [
  //   { id: '1', name: 'Friend 1' },
  //   { id: '2', name: 'Friend 2' },
  //   { id: '3', name: 'Friend 3' },
  // ];
}
