import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FriendrequestService } from '../../core/services/friendrequest/friendrequest.service';
import { FriendRequest } from '../../core/interfaces/FriendRequest';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users/users.service';
import { User } from '../../core/interfaces/User';

@Component({
  selector: 'app-view-friend-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-friend-requests.component.html',
  styleUrls: ['./view-friend-requests.component.scss'] // corrected to `styleUrls`
})
export class ViewFriendRequestsComponent implements OnInit {

  friendRequests: FriendRequest[] = [];

  constructor(
    private readonly authService: AuthService, 
    private readonly friendReq: FriendrequestService,
    private readonly userService: UsersService
  ) { }

  ngOnInit() {
    const id = this.authService.getUserIdByJWT();
    this.friendReq.getFriendsReqByUserId(id).subscribe((res: FriendRequest[]) => {
      this.friendRequests = res;
      this.loadSenderDetails();
    }, (error) => {
      console.error(error);
    });
  }

  loadSenderDetails() {
    this.friendRequests.forEach((request, index) => {
      this.userService.getUserById(request.senderId).subscribe((user: User) => {
        this.friendRequests[index].sender = user;
      }, (error: any) => {
        console.error(`Error fetching details for user ID ${request.senderId}`, error);
      });
    });
  }

  acceptSenderReq(request: FriendRequest) {
    const userId = this.authService.getUserIdByJWT();

    if (request.sender && request.sender.username) {
      this.friendReq.acceptFriendReqBy(userId, request.sender.username).subscribe({
        next: () => {
          console.log(`Friend request from ${request.sender!.username} accepted successfully`);
          this.friendRequests = this.friendRequests.filter(fr => fr.senderId !== request.senderId);
        },
        error: (error) => {
          console.error("Error accepting friend request", error);
        }
      });
    } else {
      console.error("Sender username is undefined");
    }
  }
}
