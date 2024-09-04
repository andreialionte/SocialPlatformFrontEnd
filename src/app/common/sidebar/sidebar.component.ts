import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsService } from '../../core/services/friends/friends.service';
import { Friend } from '../../core/interfaces/Friend';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { User } from '../../core/interfaces/User';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() friendSelected = new EventEmitter<number>();

  constructor(private readonly friendsService: FriendsService, private readonly userService: UsersService) {}

  tokenString: string = localStorage.getItem('token') || '';
  friends: Friend[] = [];
  selectedFriendId?: number;
  userId!: number;
  userDetails!: User;

  ngOnInit(): void {
    this.getUserByUserId(); 
  }

  getUserIdFromJwt(): number {
    const payload = JSON.parse(atob(this.tokenString.split('.')[1]));
    return payload.userId;
  }

  getUserByUserId(): void {
    this.userService.getUserById(this.getUserIdFromJwt()).subscribe(
      (data: User) => {
        this.userDetails = data;
        this.userId = data.id; 
        this.getFriends(); 
      },
      (error) => {
        console.error('Failed to fetch user details', error);
      }
    );
  }

  getFriends(): void {
    if (this.tokenString) {
      this.friendsService.getFriendsByUserId(this.userId).subscribe({
        next: (data: Friend[]) => {
          this.friends = data.filter(friend => friend.friendUser?.id !== this.userId);
          console.log(this.friends); 
        },
        error: (err) => console.error('Failed to fetch friends', err)
      });
    }
  }

  selectFriend(friendId: number): void {
    this.selectedFriendId = friendId;
    this.friendSelected.emit(friendId);
  }
}
