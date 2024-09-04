import { Component } from '@angular/core';
import { SidebarComponent } from '../../common/sidebar/sidebar.component';
import { ChatComponent } from '../../common/chat/chat.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, ChatComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedFriendId?: number;

  onFriendSelected(friendId: number) {
    this.selectedFriendId = friendId;
  }
}
