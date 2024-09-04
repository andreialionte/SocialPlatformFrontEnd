import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly Httpclient: HttpClient) {
   }

   getUserByUserName(userName: string): Observable<User[]>{
    // ! here add the httpget for the GetUsers/{userName} in .NET CORE
    return this.Httpclient.get<User[]>(`https://localhost:7036/api/Users/GetUsers/${userName}`);
  }

  getUserById(id: number): Observable<User>{
    return this.Httpclient.get<User>(`https://localhost:7036/api/Users/GetUser/${id}`);
  }
}
