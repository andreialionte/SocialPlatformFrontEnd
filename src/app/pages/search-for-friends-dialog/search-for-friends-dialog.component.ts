import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';
import { User } from '../../core/interfaces/User';
import { FriendRequest } from '../../core/interfaces/FriendRequest';
import { FriendrequestService } from '../../core/services/friendrequest/friendrequest.service';

@Component({
  selector: 'app-search-for-friends-dialog',
  standalone: true,
  templateUrl: './search-for-friends-dialog.component.html',
  styleUrls: ['./search-for-friends-dialog.component.scss'],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FormsModule,    
    MatDialogModule,
    CommonModule
  ],
})
export class SearchForFriendsDialogComponent {
  searchQuery: string = '';
  searchResults: User[] = [];
  tokenString: string = localStorage.getItem('token') || '';

  constructor(private readonly userService: UsersService, private readonly friendReqService: FriendrequestService) {}

  onSearchChange(query: string) {
    this.searchQuery = query; // query = username
    if (query.trim()) {
      this.userService.getUserByUserName(query).subscribe({
        next: (users: User[]) => {
          this.searchResults = users; 
        },
        error: (err) => {
          console.error('Error occurred while searching:', err);
          this.searchResults = [];
        }
      });
    } else {
      this.searchResults = []; 
    }
  }

  getUserIdByJWT(): number | null {
    try {
      const payload = JSON.parse(atob(this.tokenString.split('.')[1]));
      return payload.userId; // Ensure payload.userId exists
    } catch (e) {
      console.error('Error decoding JWT token:', e);
      return null;
    }
  }

  addFriendFn() {
    const userId = this.getUserIdByJWT();
    if (!userId) {
      console.error('User ID could not be extracted from JWT token.');
      return;
    }
    if (!this.searchQuery.trim()) {
      console.error('Search query is empty.');
      return;
    }
  
    this.friendReqService.sendFriendReqByIdAndUserId(userId, this.searchQuery).subscribe({
      next: (response: FriendRequest) => {
        console.dir(response);
        // Optionally update the UI or give feedback to the user
      },
      error: (err) => {
        console.error('Error sending friend request:', err);
      }
    });
  }
  
}
