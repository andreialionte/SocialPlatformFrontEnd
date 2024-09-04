import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserForRegister } from '../../interfaces/user-for-register';
import { UserForLogin } from '../../interfaces/UserForLogin';
// import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private apiUrl = 'https://localhost:7036/api/Auths';

  constructor(private http: HttpClient, private router: Router) { }

  public registerUser(user: UserForRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, user);
  }

  public loginUser(user: UserForLogin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/Login`, user);
  }

  public storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  tokenString:string = localStorage.getItem("token") || "";
  getUserIdByJWT(): number {
      const payload = JSON.parse(atob(this.tokenString.split('.')[1]));
      return payload.userId;
  }

  public signOut(){
    localStorage.removeItem("token");
    return window.location.reload(); //just reload without tell the app to send to route of /login because we added guard to login 
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }

}
